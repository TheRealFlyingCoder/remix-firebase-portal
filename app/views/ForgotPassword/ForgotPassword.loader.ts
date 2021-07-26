import { json, LoaderFunction } from 'remix';
import setHeaders from '../../server/headers.server';
import { getSession, SessionKey } from '../../server/sessions.server';
import createCSRFToken from '../../utils/csrf';
import tryParse from '../../utils/tryParse';
import { ForgotPasswordActionForm } from './ForgotPassword.action';

export interface ForgotLoaderData {
	error?: string;
	csrf: string;
    validationErrors?: Partial<ForgotPasswordActionForm>;
    message?: string;
}

export const loader: LoaderFunction = async ({ request }) => {
    let session = await getSession(request);

	const csrf = createCSRFToken();
	session.set(SessionKey.Csrf, csrf);
	const validationErrors = tryParse<Partial<ForgotPasswordActionForm>>(session.get(SessionKey.ValidationError));

	const data = {
		error: session.get(SessionKey.Error),
		validationErrors,
        message: session.get(SessionKey.Message),
		csrf,
	};

	return json(data, await setHeaders({ session }));
};
