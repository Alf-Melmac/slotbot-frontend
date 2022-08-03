import {Route, Routes} from 'react-router-dom';
import {EventDetails} from './details/EventDetails';
import {Events} from './calendar/Events';
import {EventWizard} from './wizard/EventWizard';

export function EventRoutes(): JSX.Element {
	return (
		<Routes>
			<Route path="" element={<Events/>}/>
			<Route path=":eventId" element={<EventDetails/>}/>
			<Route path="/new" element={<EventWizard/>}/>
		</Routes>
	);
}
