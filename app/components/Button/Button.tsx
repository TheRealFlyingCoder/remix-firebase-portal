import clsx from 'clsx';
import React, { ButtonHTMLAttributes } from 'react';
import Spinner from '../Spinner';

export enum ButtonType {
	Primary = 'text-white bg-brand hover:bg-brand/80 hover:disabled:bg-brand',
	Secondary = 'text-white bg-yellow-500 hover:bg-yellow-600 hover:disabled:bg-yellow-500',
	Outline = 'border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	leadingIcon?: CustomSVG;
	trailingIcon?: CustomSVG;
	buttonType?: ButtonType;
	spinnerOnDisabled?: boolean;
	fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
	children,
	fullWidth,
	spinnerOnDisabled,
	leadingIcon: LIcon,
	trailingIcon: TIcon,
	buttonType = ButtonType.Primary,
	className,
	disabled,
	...props
}) => {
	return (
		<button
			className={clsx(
				'rounded inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium',
				'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand/80',
				'disabled:opacity-50 hover:disabled:cursor-default',
				buttonType,
				fullWidth && 'w-full justify-center',
				className,
			)}
			disabled={disabled}
			{...props}
		>
			{LIcon && <LIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />}
			{!!spinnerOnDisabled && disabled ? <Spinner className="h-5 w-5 m-1" /> : children}
			{TIcon && <TIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />}
		</button>
	);
};

export const PrimaryButton: React.FC<ButtonProps> = props => <Button {...props} />;
export const SecondaryButton: React.FC<ButtonProps> = props => <Button {...props} buttonType={ButtonType.Secondary} />;
export const OutlineButton: React.FC<ButtonProps> = props => <Button {...props} buttonType={ButtonType.Outline} />;

export default Button;
