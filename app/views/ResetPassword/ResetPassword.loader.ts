import { json, LoaderFunction } from 'remix';
import setHeaders from '../../server/headers.server';
import { getSession, SessionKey } from '../../server/sessions.server';
import createCSRFToken from '../../utils/csrf';
import tryParse from '../../utils/tryParse';
import { ResetPasswordActionForm } from './ResetPassword.action';

export interface ResetPasswordLoaderData {
	error?: string;
    oobCode: string;
    apiKey: string;
    continueUrl?: string;
	csrf: string;
    validationErrors?: Partial<ResetPasswordActionForm>;
    message?: string;
}

export const loader: LoaderFunction = async ({ request }) => {
    let session = await getSession(request);
    const params = new URL(request.url).searchParams;

    const oobCode = params.get('oobCode');
    const apiKey = params.get('apiKey');
    const continueUrl = params.get('continueUrl');

    if(!oobCode) {
        session.flash(SessionKey.Error, 'URL is missing token.')
    }

	const csrf = createCSRFToken();
	session.set(SessionKey.Csrf, csrf);
	const validationErrors = tryParse<Partial<ResetPasswordActionForm>>(session.get(SessionKey.ValidationError));

	const data = {
		error: session.get(SessionKey.Error),
		validationErrors,
        message: session.get(SessionKey.Message),
		csrf,
        oobCode,
        apiKey,
        continueUrl
	};

	return json(data, await setHeaders({ session }));
};
