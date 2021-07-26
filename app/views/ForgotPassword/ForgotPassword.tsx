import { Form, Link, usePendingFormSubmit, useRouteData } from 'remix';
import { ForgotLoaderData } from './ForgotPassword.loader';
import FormCard from '../../components/FormCard';
import { useEffect, useState } from 'react';
import AppRoutes from '../../appRoutes';
import { Input } from '../../components/FormFields';
import { MailIcon } from '@heroicons/react/solid';
import { PrimaryButton } from '../../components/Button';

export default function ForgotPassword() {
	const pendingSubmit = usePendingFormSubmit();
	const { error, validationErrors, message, csrf } = useRouteData<ForgotLoaderData>();
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		setIsSubmitting(!!pendingSubmit);
	}, [pendingSubmit]);

	return (
		<FormCard
			title="Forgot your password"
			error={error}
            message={message}
			subtitle={
				<>
					Have you remembered it? <Link to={AppRoutes.Login}>Log in</Link>
				</>
			}
		>
			<Form action={AppRoutes.ForgotPassword} method="post">
				<input type="hidden" name="csrf" value={csrf} />
				<div className="space-y-6">
					<Input
						label="Email address"
						name="email"
						type="email"
						disabled={isSubmitting}
						error={validationErrors?.email}
						autoComplete="email"
						leadingIcon={MailIcon}
					/>
					<div>
						<PrimaryButton type="submit" fullWidth disabled={isSubmitting} spinnerOnDisabled>
							Send reset email
						</PrimaryButton>
					</div>
				</div>
			</Form>
		</FormCard>
	);
}
