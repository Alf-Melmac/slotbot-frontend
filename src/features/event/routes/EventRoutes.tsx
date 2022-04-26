import {Route, Routes} from 'react-router-dom';
import {EventDetails} from '../details/EventDetails';
import {Events} from '../calendar/Events';

export function EventRoutes(): JSX.Element {
	return (
		<Routes>
			<Route path="" element={<Events/>}/>
			<Route path=":eventId" element={<EventDetails/>}/>
		</Routes>
	);
}
