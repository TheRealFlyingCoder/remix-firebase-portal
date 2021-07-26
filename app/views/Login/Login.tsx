import { useEffect, useState } from 'react';
import { useSubmit, useRouteData, usePendingFormSubmit, Link, Form } from 'remix';
import AppRoutes from '../../appRoutes';
import FormCard from '../../components/FormCard';
import SingleSignOn from '../../components/SingleSignOn';
import { LoginLoaderData } from './Login.loader';
import { PrimaryButton } from '../../components/Button';
import { Checkbox, Input } from '../../components/FormFields';
import { LockClosedIcon, MailIcon } from '@heroicons/react/solid';

export default function Login() {
	const pendingSubmit = usePendingFormSubmit();
	const { error, csrf, continueUrl, submittingOAuth } = useRouteData<LoginLoaderData>();
	const [isSubmitting, setIsSubmitting] = useState(!!submittingOAuth);
	const [appError, setError] = useState<string>();
	const [remember, setRemember] = useState(true);
	const submit = useSubmit();

	useEffect(() => {
		if(!isSubmitting && !!pendingSubmit) {
			setIsSubmitting(!!pendingSubmit);
		}
	}, [pendingSubmit]);

	const submitToken = (idToken: string, refreshToken: string) => {
		submit({ idToken, refreshToken, csrf, remember: remember ? 'remember' : '', continueUrl }, { method: 'post' });
	};

	return (
		<FormCard
			title="Sign in to your account"
			error={appError || error}
			subtitle={
				<>
					Or <Link to={AppRoutes.CreateAccount}>create an account</Link>
				</>
			}
		>
			<Form action={AppRoutes.Login} method="post" className="space-y-6">
				<input type="hidden" name="csrf" value={csrf} />
				<input type="hidden" name="continueUrl" value={continueUrl} />
				<div className="space-y-6">
					<Input
						label="Email address"
						name="email"
						type="email"
						disabled={isSubmitting}
						autoComplete="email"
						required
						leadingIcon={MailIcon}
					/>
					<Input
						label="Password"
						name="password"
						type="password"
						disabled={isSubmitting}
						autoComplete="current-password"
						required
						leadingIcon={LockClosedIcon}
					/>

					<div className="flex items-center justify-between">
						<Checkbox
							label="Remember me"
							name="remember"
							disabled={isSubmitting}
							checked={remember}
							onChange={e => setRemember(e.currentTarget.checked)}
						/>
						<Link to={AppRoutes.ForgotPassword} className="text-sm">
							Forgot your password?
						</Link>
					</div>
					<div>
						<PrimaryButton type="submit" fullWidth disabled={isSubmitting} spinnerOnDisabled>
							Sign in
						</PrimaryButton>
					</div>
				</div>
			</Form>
			<SingleSignOn submittingOAuth={submittingOAuth}  setIsSubmitting={setIsSubmitting} submitToken={submitToken} setError={setError} isSubmitting={isSubmitting} />
		</FormCard>
	);
}
