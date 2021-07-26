import { ActionFunction, redirect } from 'remix';
import AppRoutes from '../../appRoutes';
import { setBasicInfo } from '../../server/auth.server';
import setHeaders from '../../server/headers.server';
import { SessionKey } from '../../server/sessions.server';
import { validateCSRFToken } from '../../utils/csrf';
import getFormBody from '../../utils/getFormBody';
import getValidationErrors from '../../utils/getValidationErrors';
import basicInfoScheme from './BasicInfo.schema';
import withAuth from '../../server/withAuthToken.server';

export interface BasicInfoActionForm extends ActionForm {
	firstName: string;
	lastName: string;
	csrf: string;
}

export const action: ActionFunction = async ({ request, context }) => {
    return withAuth(request, async ({ token, session }) => {
        try {
            const form = await getFormBody<BasicInfoActionForm>(request, context);
            const { lastName, firstName, csrf } = form;
    
            await validateCSRFToken(csrf, session);
    
            const validationMessages = getValidationErrors(basicInfoScheme, form, true);
            if (!!validationMessages) {
                session.flash(SessionKey.ValidationError, validationMessages);
                return redirect(AppRoutes.BasicInfo, await setHeaders({ session }));
            }

            await setBasicInfo(token, {
                firstName,
                lastName
            });    
    
            return redirect(AppRoutes.Dashboard);
        } catch (error) {
            session.flash(SessionKey.Error, error.inner ? error.inner : error.message || error);
            return redirect(AppRoutes.CreateAccount, await setHeaders({ session }));
        }
    });
	
};
