import { json, LoaderFunction } from 'remix';
import { verifyEmailToken } from '../../server/auth.server';
import { refreshIdToken } from '../../server/auth.server';
import { createSessionToken } from '../../server/firebase.server';
import setHeaders from '../../server/headers.server';
import { SessionKey } from '../../server/sessions.server';
import withAuth from '../../server/withAuthToken.server';

export interface VerifyAccountLoaderData {
	error?: string;
	message?: string;
	email?: string;
	verified: boolean;
	continueUrl?: string;
}

export const loader: LoaderFunction = async ({ request }) => {
	return withAuth(request, async ({ token, session, refreshToken }) => {
		const params = new URL(request.url).searchParams;
		const oobCode = params.get('oobCode');
		const continueUrl = params.get('continueUrl');
		let error = session.get(SessionKey.Error);
		console.log(error);
		let verified = false;
		try {
			if (!oobCode) {
				throw '';
			}
			await verifyEmailToken(oobCode);
			const { newIdToken, newRefreshToken } = await refreshIdToken(refreshToken);
			session.set(SessionKey.FirebaseSession, createSessionToken(newIdToken, true));
            session.set(SessionKey.RefreshToken, newRefreshToken);
			verified = true;
		} catch (e) {
			error = e;
		}

		const data = {
			error,
			verified,
			email: token.email,
			message: session.get(SessionKey.Message),
			continueUrl,
		};

		return json(data, await setHeaders({ session }));
	});
};
