import {RouteObject} from 'react-router-dom';
import {AdminUtils} from './AdminUtils';
import {notFoundRoute} from '../error/ErrorRoutes';
import {RequireAuth} from '../../contexts/authentication/RequireAuth';
import {ApplicationRoles} from '../../contexts/authentication/authenticationTypes';
import {PropsWithChildren} from 'react';

function AdminRoute(props: PropsWithChildren): JSX.Element {
	return <RequireAuth authority={ApplicationRoles.ROLE_SYS_ADMIN}>{props.children}</RequireAuth>;
}

export const adminRoutes: RouteObject[] = [
	{
		path: 'utils',
		element: <AdminRoute><AdminUtils/></AdminRoute>,
	},
	notFoundRoute,
];
