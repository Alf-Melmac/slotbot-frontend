import {Navigate, RouteObject} from 'react-router-dom';
import {Profile} from './Profile';
import {RequireAuth} from '../../contexts/authentication/RequireAuth';
import {useAuth} from '../../contexts/authentication/AuthProvider';
import {notFoundRoute} from '../error/ErrorRoutes';

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
		element: <Profile/>,
	},
	notFoundRoute,
];

export type ProfilePageParams = {
	userId: string
};
