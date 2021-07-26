import firebaseConfig from "../../firebase.config";

const identityBase = 'https://identitytoolkit.googleapis.com/v1/accounts';
const { apiKey } = firebaseConfig;

export default {
    SignInWithEmailAndPassword: `${identityBase}:signInWithPassword?key=${apiKey}`,
    SignUpWithEmailAndPassword: `${identityBase}:signUp?key=${apiKey}`,
    confirmEmailVerification: `${identityBase}:update?key=${apiKey}`,
    confirmPasswordReset: `${identityBase}:resetPassword?key=${apiKey}`,
    refreshIdToken: `https://securetoken.googleapis.com/v1/token?key=${apiKey}`,
}