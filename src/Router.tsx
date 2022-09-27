import {Title} from "@mantine/core";
import {StartPage} from "./features/startpage/StartPage";
import {Route, Routes} from 'react-router-dom';
import {EventRoutes} from './features/event/EventRoutes';
import {ProfileRoutes} from './features/profile/ProfileRoutes';
import {AuthProvider} from './contexts/authentication/AuthProvider';
import {AdminRoutes} from './features/admin/AdminRoutes';
import {RequireAuth} from './contexts/authentication/RequireAuth';
import {ApplicationRoles} from './contexts/authentication/authenticationTypes';

export function Router(): JSX.Element {
	return (
		<AuthProvider>
			<Routes>
				<Route path="/" element={<StartPage/>}/>
				<Route path="events/*" element={<EventRoutes/>}/>
				<Route path="profile/*" element={<ProfileRoutes/>}/>
				<Route path="admin/*" element={<RequireAuth authority={ApplicationRoles.ROLE_SYS_ADMIN}><AdminRoutes/></RequireAuth>}/>
				<Route path="/404" element={<Title>404 :(</Title>}/>
			</Routes>
		</AuthProvider>
	);
}
