import {RouteObject} from 'react-router-dom';
import {eventRoutes} from './features/event/EventRoutes';
import {profileRoutes} from './features/profile/ProfileRoutes';
import {adminRoutes} from './features/admin/AdminRoutes';
import {notFoundRoute} from './features/error/ErrorRoutes';
import {NotAllowed} from './features/error/NotAllowed';

export const routes: RouteObject[] = [
	{
		path: 'events/*',
		children: eventRoutes,
	},
	{
		path: 'profile/*',
		children: profileRoutes,
	},
	{
		path: 'admin/*',
		children: adminRoutes,
	},
	{
		path: '403',
		element: <NotAllowed/>,
	},
	notFoundRoute,
];
