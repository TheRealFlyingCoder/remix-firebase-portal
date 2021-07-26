import { ActionFunction, redirect } from 'remix';
import AppRoutes from '../../appRoutes';
import { createSessionToken, getDecodedToken } from '../../server/firebase.server';
import { createAccount } from '../../server/auth.server';
import setHeaders from '../../server/headers.server';
import { getSession, SessionKey } from '../../server/sessions.server';
import { validateCSRFToken } from '../../utils/csrf';
import getFormBody from '../../utils/getFormBody';
import getValidationErrors from '../../utils/getValidationErrors';
import createAccountSchema from './CreateAccount.schema';
import { sendVerifyEmail } from '../../server/email.server';

export interface CreateAccountActionForm extends ActionForm {
	idToken?: string;
	refreshToken?: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	remember: string;
	csrf: string;
}

export const action: ActionFunction = async ({ request, context }) => {
	let session = await getSession(request);
	try {
		const form = await getFormBody<CreateAccountActionForm>(request, context);
		const { idToken, refreshToken, email, password, lastName, firstName, remember, csrf } = form;

		await validateCSRFToken(csrf, session);

		const validationMessages = getValidationErrors(createAccountSchema, form, true);
		if (!!validationMessages) {
			session.flash(SessionKey.ValidationError, validationMessages);
			return redirect(AppRoutes.CreateAccount, await setHeaders({ session }));
		}

		let token = idToken;
		let refresh = refreshToken;
		if (!token) {
			const newTokens = await createAccount(
				{
					email,
					firstName,
					lastName,
				},
				password,
			);
			
			sendVerifyEmail(email);

			//Successfully created an account but couldn't sign in
			if (!newTokens) {
				return redirect(AppRoutes.Login);
			} else {
				token = newTokens.idToken;
				refresh = newTokens.refreshToken;
			}
		}

		session.set(SessionKey.FirebaseSession, await createSessionToken(token, !!remember));
		session.set(SessionKey.RefreshToken, refresh);
		return redirect(AppRoutes.Dashboard, await setHeaders({ session, clearExpiry: !remember }));
	} catch (error) {
		session.flash(SessionKey.Error, error.inner ? error.inner : error.message || error);
		return redirect(AppRoutes.CreateAccount, await setHeaders({ session }));
	}
};
