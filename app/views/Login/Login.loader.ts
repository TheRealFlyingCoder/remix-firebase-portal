import { json, LoaderFunction } from 'remix';
import { getSession, SessionKey } from '../../server/sessions.server';
import setHeaders from '../../server/headers.server';
import createCSRFToken from '../../utils/csrf';

export interface LoginLoaderData {
	error?: string;
	csrf: string;
	submittingOAuth: boolean;
	continueUrl: string;
}

export const loader: LoaderFunction = async ({ request }) => {
	let session = await getSession(request);
	const params = new URL(request.url).searchParams;
	//Not logged in so we can continue
	const csrf = createCSRFToken();
	session.set(SessionKey.Csrf, csrf);
	session.unset(SessionKey.FirebaseSession);

	let data: LoginLoaderData = { error: session.get(SessionKey.Error), csrf, submittingOAuth: !!params.get('submittingOAuth'), continueUrl: params.get('continueUrl') || '' };

	return json(data, await setHeaders({ session }));
};
