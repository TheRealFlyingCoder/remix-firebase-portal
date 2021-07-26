import { Form, Link, usePendingFormSubmit, useRouteData } from 'remix';
import { ResetPasswordLoaderData } from './ResetPassword.loader';
import FormCard from '../../components/FormCard';
import { useEffect, useState } from 'react';
import AppRoutes from '../../appRoutes';
import { Input } from '../../components/FormFields';
import { LockClosedIcon } from '@heroicons/react/solid';
import { PrimaryButton } from '../../components/Button';

export default function ResetPassword() {
	const pendingSubmit = usePendingFormSubmit();
	const { error, validationErrors, oobCode, apiKey, continueUrl } = useRouteData<ResetPasswordLoaderData>();
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		setIsSubmitting(!!pendingSubmit);
	}, [pendingSubmit]);

	return (
		<FormCard
			title="Reset your password"
			error={error}
			subtitle={
				<>
					Don't need a reset? <Link to={AppRoutes.Login}>Log in</Link>
				</>
			}
		>
			<Form action={AppRoutes.ResetPassword} method="post">
                <input type="hidden" name="oobCode" value={oobCode} />
                <input type="hidden" name="apiKey" value={apiKey} />
                <input type="hidden" name="continueUrl" value={continueUrl || ''} />
				<div className="space-y-6">
					<Input
						label="New Password"
						name="password"
						type="password"
						disabled={isSubmitting}
						error={validationErrors?.password}
						autoComplete="none"
						leadingIcon={LockClosedIcon}
					/>
                    <Input
						label="Confirm Password"
						name="confirm"
						type="password"
						disabled={isSubmitting}
						error={validationErrors?.confirm}
						autoComplete="none"
						leadingIcon={LockClosedIcon}
					/>
					<div>
						<PrimaryButton type="submit" fullWidth disabled={isSubmitting} spinnerOnDisabled>
							Reset password
						</PrimaryButton>
					</div>
				</div>
			</Form>
		</FormCard>
	);
}
