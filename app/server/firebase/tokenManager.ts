import type { DecodedIdToken } from 'firebase-admin/auth';
import type { Request } from 'node-fetch';
import { getAuth } from './initialisers';
import { Session } from 'remix';
import { getSession, SessionKey, userSessionExpiryMS } from '../sessions.server';

export const getTokenFromRequest = async (request: Request, checkRevoked = false): Promise<DecodedIdToken> => {
	try {
		const session = await getSession(request);
		const firebaseSession = session.get(SessionKey.FirebaseSession);
		const token = await getAuth().verifySessionCookie(firebaseSession, checkRevoked);
		return token;
	} catch (e) {
		throw 'Could not validate token';
	}
};

export const getTokenFromSession = async (session: Session, checkRevoked = false): Promise<DecodedIdToken | null> => {
	try {
		const firebaseSession = session.get(SessionKey.FirebaseSession);
		const token = await getAuth().verifySessionCookie(firebaseSession, checkRevoked);
		return token;
	} catch (e) {
		throw 'Could not validate token';
	}
};

export const getDecodedToken = async (token: string, checkRevoked = false): Promise<DecodedIdToken> => {
	try {
		const decodedToken = await getAuth().verifyIdToken(token, checkRevoked);
		return decodedToken;
	} catch (e) {
		throw 'Could not validate token';
	}
};

export const createSessionToken = async (token: string, remember: boolean): Promise<string> => {
	return await getAuth().createSessionCookie(token, {
		expiresIn: remember ? userSessionExpiryMS : 24 * 60 * 60 * 1000,
	});
};

export const revokeSession = async (session: Session): Promise<void> => {
	const decoded = await getTokenFromSession(session);
	if (!!decoded) {
		await getAuth().revokeRefreshTokens(decoded.uid);
	}

	return;
};