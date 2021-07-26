import { LinksFunction } from 'remix';
import { Meta, Links, Scripts, LiveReload } from 'remix';
import { initializeApp, getApps } from 'firebase/app';
import { Outlet } from 'react-router-dom';

import tailwindStyles from './styles/tailwind.css';
import firebaseConfig from './firebase.config';
import RootError from './root.error';

export let links: LinksFunction = () => {
	return [
		{ rel: 'stylesheet', href: tailwindStyles },
		{ rel: 'preload', href: '/fonts/belfast-grotesk-regular.woff2', as: 'font', crossOrigin: 'anonymous' },
		{ rel: 'preload', href: '/fonts/belfast-grotesk-regular.woff', as: 'font', crossOrigin: 'anonymous' }
	];
};

function Document({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="icon" href="/favicon.png" type="image/png" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<Scripts />
				{process.env.NODE_ENV === 'development' && <LiveReload />}
			</body>
		</html>
	);
}

export default function App() {
	if (!getApps().length) {
		initializeApp(firebaseConfig);
	}

	return (
		<Document>
			<Outlet />
		</Document>
	);
}

export function ErrorBoundary({ error }: { error: Error }) {
	return (
		<Document>
			<RootError error={error} />
		</Document>
	);
}
