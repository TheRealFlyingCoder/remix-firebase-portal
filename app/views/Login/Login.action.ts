import { ActionFunction, redirect } from 'remix';
import AppRoutes from '../../appRoutes';
import { createSessionToken, getDecodedToken } from '../../server/firebase.server';
import { signIn, userWithBasicProfile } from '../../server/auth.server';
import setHeaders from '../../server/headers.server';
import { getSession, SessionKey } from '../../server/sessions.server';
import { validateCSRFToken } from '../../utils/csrf';
import getFormBody from '../../utils/getFormBody';

export interface LoginActionForm extends ActionForm {
	email: string;
	idToken?: string;
	password: string;
	remember: string;
	csrf: string;
}

export const action: ActionFunction = async ({ request, context }) => {
	let session = await getSession(request);
	let param;

	try {
		const { email, idToken, refreshToken, password, remember, csrf, continueUrl } = await getFormBody<LoginActionForm>(request, context);
		param = continueUrl || '';
		await validateCSRFToken(csrf, session);
		let token = idToken;
		let refresh = refreshToken;

		//Email/Password login
		if(!token) {
			const res = await signIn(email, password);
			refresh = res.refreshToken;
			token = res.idToken;
		}
		
		const user = await getDecodedToken(token);
		session.set(SessionKey.RefreshToken, refresh);
		session.set(SessionKey.FirebaseSession, await createSessionToken(token, !!remember));
		return redirect(!!await userWithBasicProfile(user) ? continueUrl || AppRoutes.Dashboard : AppRoutes.BasicInfo, await setHeaders({ session, clearExpiry: !remember }));
	} catch (error) {
		session.flash(SessionKey.Error, error.message || error);
		return redirect(`${AppRoutes.Login}${!!param ? `?continueUrl=${param}` : ''}`, await setHeaders({ session }));
	}
};
