import {RouteObject} from 'react-router-dom';
import {notFoundRoute} from '../error/ErrorRoutes';
import {Guilds} from './Guilds';
import {Guild} from './Guild';

export const guildRoutes: RouteObject[] = [
	{
		path: '',
		element: <Guilds/>,
	},
	{
		path: ':guildId',
		element: <Guild/>
	},
	notFoundRoute,
];
