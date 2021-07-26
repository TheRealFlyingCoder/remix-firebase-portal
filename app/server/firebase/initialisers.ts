import { Auth, getAuth as gAuth } from 'firebase-admin/auth';
import { Firestore, getFirestore } from 'firebase-admin/firestore';
import { getApps, initializeApp } from 'firebase-admin/app';

export function initialise() {
    if (getApps().length) {
		return;
	}
	return initializeApp();
}

export function getDb(): Firestore {
	initialise();
	return getFirestore();
}

export function getAuth(): Auth {
	initialise();
	return gAuth();
}


