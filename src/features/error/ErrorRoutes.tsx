import {RouteObject} from 'react-router-dom';
import {NotFound} from './NotFound';

export const notFoundRoute: RouteObject = {
	path: '*',
	element: <NotFound/>,
};
