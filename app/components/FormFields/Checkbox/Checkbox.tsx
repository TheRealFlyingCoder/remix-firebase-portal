import clsx from 'clsx';
import React, { HTMLProps } from 'react';

interface CheckboxProps extends HTMLProps<HTMLInputElement> {
	label: string;
	name: string;
	error?: string;
	trailingCheck?: boolean;
}

const Input: React.FC<CheckboxProps> = ({
	children,
	error,
	name,
	trailingCheck,
	label,
	id,
	...props
}) => {

	const LabelEl = (
		<label htmlFor={name} className={clsx('text-sm font-medium text-gray-700', trailingCheck ? 'mr-3' : 'ml-3')}>
			{label}
		</label>
	)

	return (
		<div className="relative flex items-start">
			{!!trailingCheck && LabelEl}
			<div className="flex items-center h-5">
				<input
					name={name}
					id={id || name}
					aria-describedby="comments-description"
					type="checkbox"
					className="focus:ring-brand h-4 w-4 text-brand border-gray-300 rounded"
					{...props}
				/>
			</div>
			{!trailingCheck && LabelEl}
		</div>
	);
};

export default Input;
