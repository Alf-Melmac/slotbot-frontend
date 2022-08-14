import {Navigate, Route, Routes} from 'react-router-dom';
import {Profile} from './Profile';
import {RequireAuth} from '../../contexts/authentication/RequireAuth';
import {useAuth} from '../../contexts/authentication/AuthProvider';

export function ProfileRoutes(): JSX.Element {
	return (
		<Routes>
			<Route path="me" element={<MyProfile/>}/>
			<Route path=":userId" element={<Profile/>}/>
		</Routes>
	);
}

function MyProfile(): JSX.Element {
	const {user} = useAuth();

	return <RequireAuth><Navigate to={`/profile/${user?.id}`}/></RequireAuth>;
}
