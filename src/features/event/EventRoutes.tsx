import {RouteObject} from 'react-router-dom';
import {EventDetails} from './details/EventDetails';
import {Events} from './calendar/Events';
import {EventWizard} from './wizard/EventWizard';
import {EventEditPage} from './edit/EventEditPage';
import {notFoundRoute} from '../error/ErrorRoutes';

const existingEventRoutes: RouteObject[] = [
	{
		path: '',
		element: <EventDetails/>,
	},
	{
		path: 'edit',
		element: <EventEditPage/>,
	},
	notFoundRoute,
];

export const eventRoutes: RouteObject[] = [
	{
		path: '',
		element: <Events/>,
	},
	{
		path: ':eventId/*',
		children: existingEventRoutes,
	},
	{
		path: 'new',
		element: <EventWizard/>,
	},
	notFoundRoute,
];

export type EventPageParams = {
	eventId: string,
}
