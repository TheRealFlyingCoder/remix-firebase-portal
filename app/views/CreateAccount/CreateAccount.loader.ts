import { json, LoaderFunction } from 'remix';
import { getSession, SessionKey } from '../../server/sessions.server';
import setHeaders from '../../server/headers.server';
import createCSRFToken from '../../utils/csrf';
import { CreateAccountActionForm } from './CreateAccount.action';
import tryParse from '../../utils/tryParse';

export interface CreateAccountLoaderData {
	error?: string;
	submittingOAuth: boolean;
	validationErrors?: Partial<CreateAccountActionForm>;
	csrf: string;
}

export const loader: LoaderFunction = async ({ request }) => {
	let session = await getSession(request);
	const params = new URL(request.url).searchParams;

	const csrf = createCSRFToken();
	session.set(SessionKey.Csrf, csrf);
	const validationErrors = tryParse<Partial<CreateAccountActionForm>>(session.get(SessionKey.ValidationError));

	const data = {
		error: session.get(SessionKey.Error),
		submittingOAuth: !!params.get('submittingOAuth'),
		validationErrors,
		csrf,
	};

	return json(data, await setHeaders({ session }));
};
