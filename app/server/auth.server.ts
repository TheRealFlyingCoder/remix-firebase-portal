import axios from 'axios';
import { getAuth, getDb } from './firebase/initialisers';
import apiEndpoints from './firebase/apiEndpoints';
import { sendPasswordUpdatedEmail } from './email.server';
import { DecodedIdToken } from 'firebase-admin/auth';

export const createAccount = async (user: FirebaseUser, password: string): Promise<{idToken: string, refreshToken: string} | void> => {
	try {
        const { email, firstName } = user;
		const userRecord = await getAuth().createUser({ email, password, displayName: firstName || '' });

		await getDb().collection('users').doc(userRecord.uid).set(user);

		try {
			return await signIn(email, password);
		} catch (e) {
			console.log(e);
			return;
		}
	} catch (e) {
		throw e.message || `Error creating account: ${e}`;
	}
};

export const verifyEmailToken = async (oobCode: string): Promise<void> => {
	try {
		await axios.post(apiEndpoints.confirmEmailVerification, {
			oobCode,
		});
	} catch (e) {
		throw 'Verification token is invalid or expired, please contact us if this issue persists.';
	}
};


export const signIn = async (email: string, password: string): Promise<{idToken: string, refreshToken: string}> => {
	try {
		const res = await axios.post(apiEndpoints.SignInWithEmailAndPassword, {
			email,
			password,
			returnSecureToken: true,
		});
	
		return {
			idToken: res.data.idToken,
			refreshToken: res.data.refreshToken
		}
	} catch (e) {
		throw 'Email or password is incorrect.'
	}

};


export const refreshIdToken = async (refreshToken: string): Promise<{ newIdToken: string, newRefreshToken: string }> => {
	try {
		const res = await axios.post(apiEndpoints.refreshIdToken, {
			grant_type: 'refresh_token',
            refresh_token: refreshToken
		});

        return {
            newIdToken: res.data.id_token,
            newRefreshToken: res.data.refresh_token
        }
	} catch (e) {
		throw 'Verification token is invalid or expired, please contact us if this issue persists.';
	}
};

export const resetPassword = async (oobCode: string, newPassword: string): Promise<void> => {
	try {
		const res = await axios.post(apiEndpoints.confirmPasswordReset, {
			oobCode
		});
		const email = res.data.email;
		const user = await getAuth().getUserByEmail(email);
		await getAuth().updateUser(user.uid, { password: newPassword });
		await sendPasswordUpdatedEmail(email)
	} catch (e) {
		throw 'Email token is invalid or expired, please contact us if this issue persists.'
	}
}

export const userWithBasicProfile = async (user: DecodedIdToken): Promise<FirebaseUser | null> => {
	try {
		const userDoc = (await getDb().collection('users').doc(user.uid).get()).data() as FirebaseUser;
		if(!userDoc) {
			await getDb().collection('users').doc(user.uid).set({ email: user.email || ''});
			return null
		} ;

		return !!userDoc.firstName && !!userDoc.lastName ? userDoc : null;
	} catch (e) {
		console.log(e);
		return null;
	}
}

export const setBasicInfo = async (user: DecodedIdToken, info: BasicInfo): Promise<void> => {
	await getDb().collection('users').doc(user.uid).update({
		...info
	})
}