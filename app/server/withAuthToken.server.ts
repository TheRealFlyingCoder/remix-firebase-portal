import { ActionFunction, LoaderFunction, redirect, Response, AppData, Session, Request } from 'remix';
import { DecodedIdToken } from 'firebase-admin/auth';
import AppRoutes, { getRelativeRoute, isCurrentAppRoute } from '../appRoutes';
import { getSession, SessionKey } from './sessions.server';
import { getTokenFromSession } from './firebase/tokenManager';
import setHeaders from './headers.server';
import { userWithBasicProfile } from './auth.server';

interface WithAuthReturn {
	token: DecodedIdToken;
	user: FirebaseUser;
	session: Session;
	refreshToken: string;
}

async function withAuth<T extends LoaderFunction | ActionFunction>(
	request: Request,
	next: (authReturn: WithAuthReturn) => ReturnType<T>,
): Promise<Response | AppData> {
	let session = await getSession(request);
	const loginUrl = `${AppRoutes.Login}?continueUrl=${getRelativeRoute(request)}`;
	try {
		let token = await getTokenFromSession(session);
		let refreshToken = session.get(SessionKey.RefreshToken);
		//We need the refresh token in case we want to update via the server
		if (!token || !refreshToken) {
			return redirect(loginUrl);
		}

		//If a user creates an account for OAuth they won't have a profile yet
		//This flag catches that and makes them enter the basic info
		const user = await userWithBasicProfile(token);
		if (!user) {
			return redirect(!isCurrentAppRoute(request, AppRoutes.BasicInfo) ? AppRoutes.BasicInfo : AppRoutes.Login);
		}

		return next({ token, user, session, refreshToken });
	} catch (e) {
		return redirect(loginUrl, await setHeaders({ session }));
	}
}

export default withAuth;
