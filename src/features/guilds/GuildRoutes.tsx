import {RouteObject} from 'react-router-dom';
import {notFoundRoute} from '../error/ErrorRoutes';
import {Guilds} from './Guilds';
import {Guild} from './guild/Guild';

export const guildRoutes: RouteObject[] = [
	{
		element: <Guilds/>,
		index: true,
	},
	{
		path: ':guildId',
		element: <Guild/>,
	},
	notFoundRoute,
];
