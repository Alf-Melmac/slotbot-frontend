import {Navigate, RouteObject} from 'react-router';
import {eventRoutes} from './features/event/EventRoutes';
import {profileRoutes} from './features/profile/ProfileRoutes';
import {adminRoutes} from './features/admin/AdminRoutes';
import {notFoundRoute} from './features/error/ErrorRoutes';
import {guildRoutes} from './features/guilds/GuildRoutes';
import {StandardPage} from './features/StandardPage';
import {RequireFeatureFlag} from './features/featureFlag/RequireFeatureFlag';
import {FeatureFlag} from './features/featureFlag/useGetFeatureFlags';
import {JSX, lazy, Suspense} from 'react';

export const routes: RouteObject[] = [
	{
		path: 'events/*',
		element: <StandardPage/>,
		children: eventRoutes,
	},
	{
		path: 'profile/*',
		element: <StandardPage/>,
		children: profileRoutes,
	},
	{
		path: 'guilds/*',
		element: <GuildsPageLoader/>,
		children: guildRoutes,
	},
	{
		path: 'admin/*',
		element: <StandardPage/>,
		children: adminRoutes,
	},
	{
		path: '403/*',
		element: <StandardPage/>,
		children: [{
			path: '*',
			element: <NotAllowedPage/>,
		}],
	},
	{
		path: 'session-expired/*',
		element: <StandardPage/>,
		children: [{
			path: '*',
			element: <SessionExpiredPage/>,
		}],
	},
	{
		path: '/',
		element: <StandardPage/>,
		children: [{
			path: '/',
			element: <RequireFeatureFlag feature={FeatureFlag.BLOG} notEnabled={<Navigate to={'/events'} replace/>}>
				<HomePage/>
			</RequireFeatureFlag>,
		}],
	},
	{
		path: '*',
		element: <StandardPage/>,
		children: [notFoundRoute],
	},
];

function GuildsPageLoader(): JSX.Element {
	const GuildsPage = lazy(() => import('./features/guilds/GuildsPage'));

	return <Suspense fallback={<></>}>
		<GuildsPage/>
	</Suspense>;
}

export function NotAllowedPage(): JSX.Element {
	const NotAllowed = lazy(() => import('./features/error/NotAllowed'));

	return <Suspense fallback={<></>}>
		<NotAllowed/>
	</Suspense>;
}

function SessionExpiredPage(): JSX.Element {
	const SessionExpired = lazy(() => import('./features/error/SessionExpired'));

	return <Suspense fallback={<></>}>
		<SessionExpired/>
	</Suspense>;
}

function HomePage(): JSX.Element {
	const Home = lazy(() => import('./features/home/Home'));

	return <Suspense fallback={<></>}>
		<Home/>
	</Suspense>;
}
