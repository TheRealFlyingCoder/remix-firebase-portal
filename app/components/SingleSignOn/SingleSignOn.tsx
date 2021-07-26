import { AuthProvider, getAuth, getRedirectResult, signInWithRedirect, signOut } from 'firebase/auth';
import React, { useCallback, useEffect } from 'react';
import Apple from './components/Apple';
import Facebook from './components/Facebook';
import Google from './components/Google';
import Twitter from './components/Twitter';

interface SingleSignOnProps {
	isSubmitting: boolean;
	submittingOAuth: boolean;
	setIsSubmitting: (val: boolean) => void;
	submitToken: (token: string, refresh: string) => void;
	setError: (e: string) => void;
    label?: string
}

export interface SigninComponentProps {
	isSubmitting: boolean;
	handleAuthRedirect: (provider: AuthProvider) => void;
}

const SingleSignOn: React.FC<SingleSignOnProps> = ({ isSubmitting, submittingOAuth, label, setIsSubmitting, submitToken, setError }) => {
	const checkRedirect = useCallback(async () => {
		if (submittingOAuth) {
			setIsSubmitting(true);
			try {
				const result = await getRedirectResult(getAuth());
				if (!!result) {
					submitToken(await result.user.getIdToken(), result.user.refreshToken);
				} else {
					throw 'Failed to sign in, please try again';
				}
			} catch (e) {
				const email = e?.customData?.email;
				if (email) {
					//TODO: Handle linking accounts
					setError(`Account for ${email} is linked with another provider`);
				} else {
					setError(e.message || e);
				}
				
				setIsSubmitting(false);
			}
		} else {
			signOut(getAuth());
		}
	}, []);

	useEffect(() => {
		checkRedirect();
	}, []);

	const handleAuthRedirect = (provider: AuthProvider) => {
		try {
			setIsSubmitting(true);
			//Redirect is as slow as a snail so we push the submittingOAuth param (without refreshing the page) so that when the auth provider returns
			//our server knows that we are coming back and can have the spinner's going and everything disabled
			//if you know a better way please let me know this is a StackOverflow CTRL+C!
			if (window.history.pushState) {
				var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?submittingOAuth=true';
				window.history.pushState({path:newurl},'',newurl);
				signInWithRedirect(getAuth(), provider);
			} else {
				throw 'Social sign on not supported with this browser. Please contact us for support.'
			}
			
		} catch (e) {
			setIsSubmitting(false);
			setError(e.message || e);
		}
	};

	return (
		<div className="mt-6">
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<div className="w-full border-t border-gray-300" />
				</div>
				<div className="relative flex justify-center text-sm">
					<span className="px-2 bg-white text-gray-500">{label || 'Or continue with'}</span>
				</div>
			</div>

			<div className="mt-6 flex justify-evenly">
				<Google isSubmitting={isSubmitting} handleAuthRedirect={handleAuthRedirect} />
				<Facebook isSubmitting={isSubmitting} handleAuthRedirect={handleAuthRedirect} />
				<Twitter isSubmitting={isSubmitting} handleAuthRedirect={handleAuthRedirect} />
				<Apple isSubmitting={isSubmitting} handleAuthRedirect={handleAuthRedirect} />
			</div>
		</div>
	);
};

export default SingleSignOn;
