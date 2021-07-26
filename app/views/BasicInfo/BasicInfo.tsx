import { useEffect, useState } from 'react';
import { useRouteData, usePendingFormSubmit, Form } from 'remix';
import AppRoutes from '../../appRoutes';
import { PrimaryButton } from '../../components/Button';
import FormCard from '../../components/FormCard';
import { Input } from '../../components/FormFields';
import { BasicInfoLoaderData } from './BasicInfo.loader';

export default function BasicInfo() {
	const pendingSubmit = usePendingFormSubmit();
	const { error, validationErrors, csrf } = useRouteData<BasicInfoLoaderData>();
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		setIsSubmitting(!!pendingSubmit);
	}, [pendingSubmit]);

	return (
		<FormCard title="Welcome!" error={error} subtitle={<>We just need some basic info to get started</>}>
			<Form action={AppRoutes.BasicInfo} method="post">
				<input type="hidden" name="csrf" value={csrf} />
				<div className="space-y-6">
					<Input className="flex-1" label="First name" name="firstName" error={validationErrors?.firstName} disabled={isSubmitting} />
					<Input className="flex-1" label="Last name" name="lastName" error={validationErrors?.lastName} disabled={isSubmitting} />
					<div>
						<PrimaryButton type="submit" fullWidth disabled={isSubmitting} spinnerOnDisabled>
							Lets go!
						</PrimaryButton>
					</div>
				</div>
			</Form>
		</FormCard>
	);
}
