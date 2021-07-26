import React from 'react';
import { Link } from 'remix';
import AppRoutes from '../../appRoutes';

const Header: React.FC<{ hasSession: boolean }> = ({ hasSession }) => {
	return (
		<header className="bg-brand">
			<nav className="mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
				<div className="w-full py-6 flex items-center justify-between border-b border-brand/80 lg:border-none">
					<Link to={AppRoutes.Home}>
						<img src="/logo.png" alt="Logo" className="h-10 w-auto" />
					</Link>
					{hasSession ? (
						<div className="ml-10 flex space-x-4">
							<Link to={AppRoutes.Logout} className="button transparent small">
								Logout
							</Link>
						</div>
					) : (
						<div className="ml-10 flex space-x-4">
							<Link to={AppRoutes.Login} className="button transparent small">
								Sign in
							</Link>
							<Link to={AppRoutes.CreateAccount} className="button white small">
								Sign up
							</Link>
						</div>
					)}
				</div>
			</nav>
		</header>
	);
};

export default Header;
