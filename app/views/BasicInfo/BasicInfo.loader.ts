import { json, LoaderFunction } from 'remix';
import { getSession, SessionKey } from '../../server/sessions.server';
import setHeaders from '../../server/headers.server';
import createCSRFToken from '../../utils/csrf';
import { BasicInfoActionForm } from './BasicInfo.action';
import tryParse from '../../utils/tryParse';

export interface BasicInfoLoaderData {
	error?: string;
	validationErrors?: Partial<BasicInfoActionForm>;
	csrf: string;
}

export const loader: LoaderFunction = async ({ request }) => {
	let session = await getSession(request);

	const csrf = createCSRFToken();
	session.set(SessionKey.Csrf, csrf);
	const validationErrors = tryParse<Partial<BasicInfoActionForm>>(session.get(SessionKey.ValidationError));

	const data = {
		error: session.get(SessionKey.Error),
		validationErrors,
		csrf,
	};

	return json(data, await setHeaders({ session }));
};
