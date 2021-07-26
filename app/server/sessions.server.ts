import { createCookieSessionStorage, Request } from 'remix';

export const userSessionExpiryMS = 7 * 24 * 60 * 60 * 1000;
export enum SessionKey {
	Csrf = 'csrf',
	Error = 'error',
	Message = 'message',
	ValidationError = 'validationError',
	FirebaseSession = 'firebaseSession',
	RefreshToken = 'refreshToken',
}

let { getSession: remixGetSession, commitSession, destroySession } = createCookieSessionStorage({
	// a Cookie from `createCookie` or the CookieOptions to create one
	cookie: {
		name: '__session',
		expires: new Date(Date.now() + userSessionExpiryMS),
		maxAge: userSessionExpiryMS / 1000,
		path: '/',
		secrets: ['s3cret'],
	},
});

//I don't want to type .headers.get('Cookie') all the time
const getSession = async (request: Request) => await remixGetSession(request.headers.get('Cookie'));

export { getSession, commitSession, destroySession };
