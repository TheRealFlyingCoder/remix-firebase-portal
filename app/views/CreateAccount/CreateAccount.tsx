import { LockClosedIcon, MailIcon } from '@heroicons/react/solid';
import { AuthProvider, getAuth, getRedirectResult, signInWithRedirect, signOut } from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';
import { useSubmit, useRouteData, usePendingFormSubmit, Link, Form } from 'remix';
import AppRoutes from '../../appRoutes';
import { PrimaryButton } from '../../components/Button';
import FormCard from '../../components/FormCard';
import { Checkbox, Input } from '../../components/FormFields';
import SingleSignOn from '../../components/SingleSignOn';
import { CreateAccountLoaderData } from './CreateAccount.loader';

export interface SigninComponentProps {
	isSubmitting: boolean;
	handleAuthRedirect: (provider: AuthProvider) => void;
}

export default function CreateAccount() {
	const submit = useSubmit();
	const pendingSubmit = usePendingFormSubmit();
	const { error, validationErrors, csrf, submittingOAuth } = useRouteData<CreateAccountLoaderData>();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [appError, setError] = useState<string>();
	const [remember, setRemember] = useState(true);

	useEffect(() => {
		if (!isSubmitting && !!pendingSubmit) {
			setIsSubmitting(!!pendingSubmit);
		}
	}, [pendingSubmit]);

	const submitToken = (idToken: string) => {
		submit({ idToken, csrf, remember: remember ? 'remember' : '' }, { method: 'post' });
	};

	return (
		<FormCard
			title="Create an account"
			error={appError || error}
			subtitle={
				<>
					Already have an account? <Link to={AppRoutes.Login}>Log in</Link>
				</>
			}
		>
			<Form action="/create-account" method="post">
				<input type="hidden" name="csrf" value={csrf} />
				<div className="space-y-6">
					<div className="flex space-x-1">
						<Input
							className="flex-1"
							label="First name"
							name="firstName"
							error={validationErrors?.fName}
							disabled={isSubmitting}
						/>
						<Input
							className="flex-1"
							label="Last name"
							name="lastName"
							error={validationErrors?.lName}
							disabled={isSubmitting}
						/>
					</div>
					<Input
						label="Email address"
						name="email"
						type="email"
						disabled={isSubmitting}
						error={validationErrors?.email}
						autoComplete="email"
						leadingIcon={MailIcon}
					/>
					<Input
						label="Password"
						name="password"
						type="password"
						disabled={isSubmitting}
						error={validationErrors?.password}
						autoComplete="current-password"
						leadingIcon={LockClosedIcon}
					/>
					<Checkbox
						label="Remember me"
						name="remember"
						disabled={isSubmitting}
						checked={remember}
						onChange={e => setRemember(e.currentTarget.checked)}
					/>
					<div>
						<PrimaryButton type="submit" fullWidth disabled={isSubmitting} spinnerOnDisabled>
							Create Account
						</PrimaryButton>
					</div>
				</div>
			</Form>
			<SingleSignOn
				label="Or sign up with"
				submittingOAuth={submittingOAuth}
				isSubmitting={isSubmitting}
				setError={setError}
				setIsSubmitting={setIsSubmitting}
				submitToken={submitToken}
			/>
		</FormCard>
	);
}
