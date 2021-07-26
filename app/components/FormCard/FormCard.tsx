import React from 'react';
import { Link } from 'react-router-dom';
import AppRoutes from '../../appRoutes';

interface FormCardProps {
	title: string;
	subtitle?: string | JSX.Element;
	error?: string;
	message?: string;
}

const FormCard: React.FC<FormCardProps> = ({ children, title, message, subtitle, error }) => {
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
			<Link to={AppRoutes.Home}>
						<img src="/logo.png" alt="Logo" className="h-20 w-auto" />
					</Link>
				<h2 className="mt-6 text-3xl font-extrabold text-gray-900">{title}</h2>
				{!!subtitle && <p className="mt-2 text-sm text-gray-600">{subtitle}</p>}
				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
					<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
						{children}
						{!!error && (
							<div className="mt-4 flex justify-center items-center">
								<p className="text-red-500">{error}</p>
							</div>
						)}
						{!!message && (
							<div className="mt-4 flex justify-center items-center">
								<p className="text-green-500">{message}</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default FormCard;
