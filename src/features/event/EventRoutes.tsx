import {RouteObject} from 'react-router-dom';
import {EventDetails} from './details/EventDetails';
import {Events} from './calendar/Events';
import {EventWizard} from './wizard/EventWizard';
import {EventEditPage} from './edit/EventEditPage';
import {notFoundRoute} from '../error/ErrorRoutes';
import {PropsWithChildren} from 'react';
import {RequireAuth} from '../../contexts/authentication/RequireAuth';
import {ApplicationRoles} from '../../contexts/authentication/authenticationTypes';

function EventManageRoute(props: PropsWithChildren): JSX.Element {
	return <RequireAuth authority={ApplicationRoles.ROLE_EVENT_MANAGE}>{props.children}</RequireAuth>;
}

const existingEventRoutes: RouteObject[] = [
	{
		path: '',
		element: <EventDetails/>,
	},
	{
		path: 'edit',
		element: <EventManageRoute><EventEditPage/></EventManageRoute>,
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
		element: <EventManageRoute><EventWizard/></EventManageRoute>,
	},
	notFoundRoute,
];

export type EventPageParams = {
	eventId: string,
}
