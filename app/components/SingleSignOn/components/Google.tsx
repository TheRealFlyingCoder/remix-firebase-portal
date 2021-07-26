import React from 'react';
import { GoogleAuthProvider } from 'firebase/auth';
import { GoogleLogo } from '../../../assets/icons';
import { SigninComponentProps } from '../SingleSignOn';
import SocialButton from './SocialButton';

const Google: React.FC<SigninComponentProps> = ({ handleAuthRedirect, isSubmitting }) => {
	return (
		<SocialButton onClick={() => handleAuthRedirect(new GoogleAuthProvider)} disabled={isSubmitting} sr="Sign in with Google" icon={GoogleLogo} />
	);
};

export default Google;
