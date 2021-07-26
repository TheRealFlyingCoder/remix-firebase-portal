import { Form, Link, usePendingFormSubmit, useRouteData } from 'remix';
import { VerifyAccountLoaderData } from './VerifyAccount.loader';
import FormCard from '../../components/FormCard';
import { useEffect, useState } from 'react';
import AppRoutes from '../../appRoutes';
import { Input } from '../../components/FormFields';
import { MailIcon } from '@heroicons/react/solid';
import { PrimaryButton } from '../../components/Button';

export default function VerifyAccount() {
	const pendingSubmit = usePendingFormSubmit();
	const { error, verified, message, email } = useRouteData<VerifyAccountLoaderData>();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const showError = !verified && !!error;

	useEffect(() => {
		setIsSubmitting(!!pendingSubmit);
	}, [pendingSubmit]);

	return (
		<FormCard
			title="Verify Account"
			message={message}
			error={showError ? error : ''}
			subtitle={!verified ? 'Please check your emails, if it\'s been over 5 minutes resend it below' : ''}
		>
			{verified ? (
				<div>
					<h2>Email Verified!</h2>
					<p>Thanks for verifying, now lets get started</p>
					<Link to={AppRoutes.Dashboard} className="button primary mt-8">
						Dashboard
					</Link>
				</div>
			) : (
				<Form action={AppRoutes.VerifyAccount} method="post">
					<div className="space-y-6">
						<Input
							label="Email"
							name="email"
							type="email"
							disabled={isSubmitting}
							defaultValue={email}
							autoComplete="none"
							required
							leadingIcon={MailIcon}
						/>
						<div>
							<PrimaryButton type="submit" fullWidth disabled={isSubmitting} spinnerOnDisabled>
								Resend verification
							</PrimaryButton>
						</div>
					</div>
				</Form>
			)}
		</FormCard>
	);
}
