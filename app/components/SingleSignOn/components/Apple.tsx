import React from 'react';
import { OAuthProvider } from 'firebase/auth';
import { AppleLogo } from '../../../assets/icons';
import { SigninComponentProps } from '../SingleSignOn';
import SocialButton from './SocialButton';

const Apple: React.FC<SigninComponentProps> = ({ handleAuthRedirect, isSubmitting }) => {
	return (
		<SocialButton onClick={() => handleAuthRedirect(new OAuthProvider('apple.com'))} disabled={isSubmitting} sr="Sign in with Apple" icon={AppleLogo} />
	);
};

export default Apple;
