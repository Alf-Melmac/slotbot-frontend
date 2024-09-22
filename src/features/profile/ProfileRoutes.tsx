import {Navigate, RouteObject} from 'react-router-dom';
import {RequireAuth} from '../../contexts/authentication/RequireAuth';
import {useAuth} from '../../contexts/authentication/AuthProvider';
import {notFoundRoute} from '../error/ErrorRoutes';
import {JSX, lazy, Suspense} from 'react';

function MyProfile(): JSX.Element {
	const {user} = useAuth();

	return <RequireAuth><Navigate to={`/profile/${user?.id}`}/></RequireAuth>;
}

export const profileRoutes: RouteObject[] = [
	{
		path: 'me',
		element: <MyProfile/>,
	},
	{
		path: ':userId',
		element: <ProfilePage/>,
	},
	notFoundRoute,
];

export type ProfilePageParams = {
	userId: string
};

function ProfilePage(): JSX.Element {
	const Profile = lazy(() => import('./Profile'));

	return <Suspense fallback={<></>}>
		<Profile/>
	</Suspense>;
}
