import {StartPage} from "./features/startpage/StartPage";
import {RouteObject} from 'react-router-dom';
import {eventRoutes} from './features/event/EventRoutes';
import {profileRoutes} from './features/profile/ProfileRoutes';
import {adminRoutes} from './features/admin/AdminRoutes';
import {notFoundRoute} from './features/error/ErrorRoutes';

export const routes: RouteObject[] = [
	{
		path: '/',
		element: <StartPage/>,
	},
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
	notFoundRoute,
];
