import React, { ButtonHTMLAttributes, SVGAttributes } from 'react';
import clsx from 'clsx';

interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    sr: string;
    icon: React.FC<SVGAttributes<SVGElement>>
}

const SocialButton: React.FC<SocialButtonProps> = ({ children, sr, icon: Icon, disabled, className, ...props }) => (
	<button
		className="group rounded-full inline-flex justify-center p-2 border-none hover:disabled:cursor-default hover:disabled:scale-100 focus:outline-none focus:ring-2 focus:ring-brand/80"
        disabled={disabled}
		{...props}
	>
        <span className="sr-only">{sr}</span>
        <Icon className={clsx('w-8 h-8 group-hover:scale-125 group-hover:drop-shadow-xl group-focus:scale-125 group-focus:drop-shadow-xl', disabled && 'opacity-50')} />
	</button>
);

export default SocialButton;
