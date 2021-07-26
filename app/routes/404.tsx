import { Link, MetaFunction } from "remix";
import AppRoutes from "../appRoutes";

export let meta: MetaFunction = () => {
  return { title: "Ain't nothing here" };
};

export default function FourOhFour() {
  return (
    <div className="bg-white min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          <p className="text-4xl font-extra text-brand sm:text-5xl">404</p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-extra text-gray-900 tracking-tight sm:text-5xl">Page not found</h1>
              <p className="mt-1 text-gray-500">Please check the URL in the address bar and try again.</p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <Link
                to={AppRoutes.Home}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semi rounded-md shadow-sm text-white bg-brand hover:bg-brand/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
              >
                Go back home
              </Link>
              <Link
                to={AppRoutes.Contact}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semi rounded-md text-brand bg-brand/10 hover:bg-brand/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
              >
                Contact support
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
