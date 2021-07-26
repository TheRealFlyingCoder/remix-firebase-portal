import { Link } from "remix";
import AppRoutes from "../../appRoutes";

export default function Landing() {
	return (
		<div className="flex flex-col items-center">
			<Link to={AppRoutes.Home}>
				<img src="/logo.png" alt="Logo" className="h-auto w-1/2" />
			</Link>
			<h1 className="mt-3 max-w-md mx-auto text-brand sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
				Thank you for trying this out
			</h1>
			<p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
				I just scrapped this together feel free to clean up for me ;) 
			</p>
			<div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
				<Link to={AppRoutes.Login} className="button primary shadow w-full">
					Login
				</Link>
			</div>
		</div>
	);
}
