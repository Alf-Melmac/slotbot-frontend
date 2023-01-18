import {RouteObject} from 'react-router-dom';
import {notFoundRoute} from '../error/ErrorRoutes';
import {Guilds} from './Guilds';

export const guildRoutes: RouteObject[] = [
	{
		path: '',
		element: <Guilds/>,
	},
	notFoundRoute,
];
