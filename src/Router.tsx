import {Title} from "@mantine/core";
import {StartPage} from "./features/startpage/StartPage";
import {Route, Routes} from 'react-router-dom';
import {EventRoutes} from './features/event/EventRoutes';
import {ProfileRoutes} from './features/profile/ProfileRoutes';
import {AuthProvider} from './features/user/AuthProvider';

export function Router(): JSX.Element {
	return (
		<AuthProvider>
			<Routes>
				<Route path="/" element={<StartPage/>}/>
				<Route path="events/*" element={<EventRoutes/>}/>
				<Route path="profile/*" element={<ProfileRoutes/>}/>
				<Route path="/404" element={<Title>404 :(</Title>}/>
			</Routes>
		</AuthProvider>
	);
}
