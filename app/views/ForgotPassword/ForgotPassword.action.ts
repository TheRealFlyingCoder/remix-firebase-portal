import { ActionFunction } from 'remix';
import { redirect } from 'remix';
import AppRoutes from '../../appRoutes';
import { sendPasswordResetEmail } from '../../server/email.server';
import setHeaders from '../../server/headers.server';
import { getSession, SessionKey } from '../../server/sessions.server';
import { validateCSRFToken } from '../../utils/csrf';
import getFormBody from '../../utils/getFormBody';
import getValidationErrors from '../../utils/getValidationErrors';
import forgotPasswordSchema from './ForgotPassword.schema';

export interface ForgotPasswordActionForm extends ActionForm {
    email: string;
	csrf: string;
}

export const action: ActionFunction = async ({ request, context }) => {
	let session = await getSession(request);
	try {
		const form = await getFormBody<ForgotPasswordActionForm>(request, context);
        const { email, csrf } = form;

		await validateCSRFToken(csrf, session);
        
        const validationMessages = getValidationErrors(forgotPasswordSchema, form, true);
        if(!!validationMessages) {
            session.flash(SessionKey.ValidationError, validationMessages);
            return redirect(AppRoutes.ForgotPassword, await setHeaders({ session }));
        }

		//Uncomment to actually send the email
		//await sendPasswordResetEmail(email);
		session.flash(SessionKey.Message, 'Reset password email has been sent.');
		return redirect(AppRoutes.ForgotPassword, await setHeaders({ session }));
	} catch (error) {
		session.flash(SessionKey.Error, error.inner ? error.inner : error.message || error);
		return redirect(AppRoutes.ForgotPassword, await setHeaders({ session }));
	}
};