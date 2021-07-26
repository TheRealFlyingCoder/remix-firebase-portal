import { json, LoaderFunction } from 'remix';
import setHeaders from '../../server/headers.server';
import { getSession, SessionKey } from '../../server/sessions.server';

export interface HomeLoaderData {
	hasSession: boolean;
}
export const loader: LoaderFunction = async ({ request }) => {
	return json({
		hasSession: (await getSession(request)).get(SessionKey.FirebaseSession)
	}, setHeaders({ cache: { client: 500, server: 800, staleRevalidate: true }}));
};
