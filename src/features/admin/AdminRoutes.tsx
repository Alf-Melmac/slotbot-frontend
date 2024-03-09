import {RouteObject} from 'react-router-dom';
import {RequireAuth} from '../../contexts/authentication/RequireAuth';
import {ApplicationRoles} from '../../contexts/authentication/authenticationTypes';
import {JSX, PropsWithChildren} from 'react';
import {NotFound} from '../error/NotFound';
import {AdminUtilsPage} from './AdminUtilsPage';

function AdminRoute(props: Readonly<PropsWithChildren>): JSX.Element {
	return <RequireAuth authority={ApplicationRoles.ROLE_SYS_ADMIN}>{props.children}</RequireAuth>;
}

export const adminRoutes: RouteObject[] = [
	{
		path: 'utils',
		element: <AdminRoute><AdminUtilsPage/></AdminRoute>,
	},
	{
		path: '*',
		element: <AdminRoute><NotFound/></AdminRoute>,
	},
];
