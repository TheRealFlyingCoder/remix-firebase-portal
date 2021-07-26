import React from 'react';
import { FacebookAuthProvider } from 'firebase/auth';
import { FacebookLogo } from '../../../assets/icons';
import { SigninComponentProps } from '../SingleSignOn';
import SocialButton from './SocialButton';

const Facebook: React.FC<SigninComponentProps> = ({ handleAuthRedirect, isSubmitting }) => {
	return (
		<SocialButton onClick={() => handleAuthRedirect(new FacebookAuthProvider)} disabled={isSubmitting} sr="Sign in with Facebook" icon={FacebookLogo} />
	);
};

export default Facebook;
