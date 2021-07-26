import { ActionFunction } from 'remix';
import { redirect } from 'remix';
import AppRoutes from '../../appRoutes';
import { sendVerifyEmail } from '../../server/email.server';
import setHeaders from '../../server/headers.server';
import { getSession, SessionKey } from '../../server/sessions.server';
import getFormBody from '../../utils/getFormBody';

export interface VerifyActionForm extends ActionForm {
    email: string;
}

export const action: ActionFunction = async ({ request, context }) => {
    const session = await getSession(request);

	try {
		const form = await getFormBody<VerifyActionForm>(request, context);
        const { email } = form;
        
        await sendVerifyEmail(email);
        session.flash(SessionKey.Message, 'Verification email sent');

		return redirect(AppRoutes.VerifyAccount, await setHeaders({ session }));
	
	} catch (error) {
		session.flash(SessionKey.Error, error.inner ? error.inner : error.message || error);
		return redirect(AppRoutes.VerifyAccount, await setHeaders({ session }));
	}
};