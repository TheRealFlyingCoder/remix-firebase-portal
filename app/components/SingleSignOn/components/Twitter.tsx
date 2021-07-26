import React from 'react';
import { TwitterAuthProvider } from 'firebase/auth';
import { TwitterLogo } from '../../../assets/icons';
import { SigninComponentProps } from '../SingleSignOn';
import SocialButton from './SocialButton';

const Twitter: React.FC<SigninComponentProps> = ({ handleAuthRedirect, isSubmitting }) => {
	return (
		<SocialButton onClick={() => handleAuthRedirect(new TwitterAuthProvider)} disabled={isSubmitting} sr="Sign in with Twitter" icon={TwitterLogo} />
	);
};

export default Twitter;
