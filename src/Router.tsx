import {Title} from "@mantine/core";
import {StartPage} from "./features/startpage/StartPage";
import {Route, Routes} from 'react-router-dom';
import {EventRoutes} from './features/event/routes/EventRoutes';

export function Router(): JSX.Element {
	return (
		<Routes>
			<Route path='/' element={<StartPage/>}/>
			<Route path='events/*' element={<EventRoutes/>}/>
			<Route path='/404' element={<Title>404 :(</Title>}/>
		</Routes>
	);
}
