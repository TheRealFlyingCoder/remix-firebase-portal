import { useRouteData } from 'remix';
import { DashboardLoaderData } from './Dashboard.loader';

export default function Dashboard() {
	const { user, token } = useRouteData<DashboardLoaderData>();

	return (
		<div className="h-screen flex overflow-hidden bg-gray-100">
			<main className="flex-1 relative pb-8 z-0 overflow-y-auto">{token.email} {user.firstName}</main>
		</div>
	);
}
