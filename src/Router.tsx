import {RouteObject} from 'react-router-dom';
import {eventRoutes} from './features/event/EventRoutes';
import {profileRoutes} from './features/profile/ProfileRoutes';
import {adminRoutes} from './features/admin/AdminRoutes';
import {notFoundRoute} from './features/error/ErrorRoutes';
import {NotAllowed} from './features/error/NotAllowed';
import {guildRoutes} from './features/guilds/GuildRoutes';
import {GuildsPage} from './features/guilds/GuildsPage';
import {StandardPage} from './features/StandardPage';

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
		path: '*',
		element: <StandardPage/>,
		children: [notFoundRoute],
	},
];
