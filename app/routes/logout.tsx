import { LoaderFunction, redirect } from 'remix';
import AppRoutes from '../appRoutes';
import setHeaders from '../server/headers.server';
import { getSession } from '../server/sessions.server';

export const loader: LoaderFunction = async ({ request }) => {
	let session = await getSession(request);

	return redirect(AppRoutes.Login, await setHeaders({ destroy: session }));
};
