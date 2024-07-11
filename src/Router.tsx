import {Navigate, RouteObject} from 'react-router-dom';
import {eventRoutes} from './features/event/EventRoutes';
import {profileRoutes} from './features/profile/ProfileRoutes';
import {adminRoutes} from './features/admin/AdminRoutes';
import {notFoundRoute} from './features/error/ErrorRoutes';
import {NotAllowed} from './features/error/NotAllowed';
import {guildRoutes} from './features/guilds/GuildRoutes';
import {GuildsPage} from './features/guilds/GuildsPage';
import {StandardPage} from './features/StandardPage';
import {SessionExpired} from './features/error/SessionExpired';
import {Home} from './features/home/Home';
import {RequireFeatureFlag} from './features/RequireFeatureFlag';

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
		element: <GuildsPage/>,
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
			element: <NotAllowed/>,
		}],
	},
	{
		path: 'session-expired/*',
		element: <StandardPage/>,
		children: [{
			path: '*',
			element: <SessionExpired/>,
		}],
	},
	{
		path: '/',
		element: <StandardPage/>,
		children: [{
			path: '/',
			element: <RequireFeatureFlag feature={'BLOG'} notEnabled={<Navigate to={'/events'} replace/>}>
				<Home/>
			</RequireFeatureFlag>,
		}],
	},
	{
		path: '*',
		element: <StandardPage/>,
		children: [notFoundRoute],
	},
];
