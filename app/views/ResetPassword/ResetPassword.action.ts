import { ActionFunction } from 'remix';
import { redirect } from 'remix';
import AppRoutes from '../../appRoutes';
import { resetPassword } from '../../server/auth.server';
import setHeaders from '../../server/headers.server';
import { getSession, SessionKey } from '../../server/sessions.server';
import getFormBody from '../../utils/getFormBody';
import getValidationErrors from '../../utils/getValidationErrors';
import resetPasswordSchema from './ResetPassword.schema';

export interface ResetPasswordActionForm extends ActionForm {
    password: string;
    confirm: string;
    oobCode: string;
    continueUrl: string;
}

export const action: ActionFunction = async ({ request, context }) => {
	let session = await getSession(request);
    let resetUrl: string = AppRoutes.ResetPassword;
	try {
		const form = await getFormBody<ResetPasswordActionForm>(request, context);
        const { password, oobCode, continueUrl } = form;
        resetUrl = `${AppRoutes.ResetPassword}?&oobCode=${oobCode}&continueUrl=${continueUrl}`;
        
        const validationMessages = getValidationErrors(resetPasswordSchema, form, true);
        if(!!validationMessages) { 
            session.flash(SessionKey.ValidationError, validationMessages);
            return redirect(resetUrl, await setHeaders({ session }));
        }

        await resetPassword(oobCode, password);
		return redirect(`${AppRoutes.Login}?continueUrl=${continueUrl}`, await setHeaders({ destroy: session }));
	
	} catch (error) {
		session.flash(SessionKey.Error, error.inner ? error.inner : error.message || error);
		return redirect(resetUrl, await setHeaders({ session }));
	}
};