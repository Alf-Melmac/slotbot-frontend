import {Route, Routes} from 'react-router-dom';
import {EventDetails} from './details/EventDetails';
import {Events} from './calendar/Events';
import {EventWizard} from './wizard/EventWizard';
import {EventEditPage} from './edit/EventEditPage';

export function EventRoutes(): JSX.Element {
	return (
		<Routes>
			<Route path="" element={<Events/>}/>
			<Route path=":eventId/*" element={<ExistingEventRoutes/>}/>
			<Route path="/new" element={<EventWizard/>}/>
		</Routes>
	);
}

function ExistingEventRoutes(): JSX.Element {
	return (
		<Routes>
			<Route path="" element={<EventDetails/>}/>
			<Route path="/edit" element={<EventEditPage/>}/>
		</Routes>
	);
}

export type EventPageParams = {
	eventId: string,
}
