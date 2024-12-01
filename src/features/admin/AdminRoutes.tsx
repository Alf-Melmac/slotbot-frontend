import {RouteObject} from 'react-router';
import {RequireAuth} from '../../contexts/authentication/RequireAuth';
import {ApplicationRoles} from '../../contexts/authentication/authenticationTypes';
import {JSX, lazy, PropsWithChildren, Suspense} from 'react';
import {NotFoundPage} from '../error/ErrorRoutes';

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
		element: <AdminRoute><NotFoundPage/></AdminRoute>,
	},
];

function AdminUtilsPage(): JSX.Element {
	const AdminUtils = lazy(() => import('./AdminUtils'));

	return <Suspense fallback={<></>}>
		<AdminUtils/>
	</Suspense>;
}
