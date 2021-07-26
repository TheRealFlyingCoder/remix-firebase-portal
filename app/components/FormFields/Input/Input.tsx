import { ExclamationCircleIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import React, { HTMLProps } from 'react';

interface InputProps extends HTMLProps<HTMLInputElement> {
	label: string;
	name: string;
	error?: string;
	leadingIcon?: CustomSVG;
	trailingIcon?: CustomSVG;
}

const Input: React.FC<InputProps> = ({
	children,
	error,
	leadingIcon: LIcon,
	trailingIcon: TIcon,
	label,
	type = 'text',
	name,
	id,
	placeholder,
	className,
	...props
}) => {
	return (
		<div className="relative font-medium text-grey-4">
			<div>
				<label htmlFor={name} className="block text-sm font-medium text-gray-700">
					{label}
				</label>
				<div className="mt-1 relative rounded-md shadow-sm">
					{!!LIcon && (
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<LIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
						</div>
					)}
					<input
						placeholder={placeholder || label}
						name={name}
						id={id || name}
						aria-invalid={!!error}
						aria-describedby={`${name}-error`}
						type={type}
						{...props}
						className={clsx(
							'focus:ring-brand focus:border-brand block w-full sm:text-sm border-gray-300 rounded-md',
							!!LIcon && 'pl-10',
							(!!TIcon || !!error) && 'pr-10',
						)}
					/>
					{!!TIcon && !error && (
						<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
							<TIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
						</div>
					)}
					{!!error && (
						<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
							<ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
						</div>
					)}
				</div>				
			</div>
			{error && (
				<span id={`${name}-error`} className="absolute left-0 -bottom-5 text-xs text-red-600">{error}</span>
			)}
		</div>
	);
};

export default Input;
