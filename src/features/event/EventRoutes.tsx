import {RouteObject} from 'react-router-dom';
import {EventDetails} from './details/EventDetails';
import {Events} from './calendar/Events';
import {notFoundRoute} from '../error/ErrorRoutes';
import {JSX, lazy, PropsWithChildren, Suspense} from 'react';
import {RequireAuth} from '../../contexts/authentication/RequireAuth';
import {ApplicationRoles} from '../../contexts/authentication/authenticationTypes';

function EventManageRoute(props: Readonly<PropsWithChildren>): JSX.Element {
	return <RequireAuth authority={ApplicationRoles.ROLE_EVENT_MANAGE}>{props.children}</RequireAuth>;
}

const existingEventRoutes: RouteObject[] = [
	{
		path: '',
		element: <EventDetails/>,
	},
	{
		path: 'edit',
		element: <EventManageRoute><EventManagePage/></EventManageRoute>,
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
		element: <EventManageRoute><EventManagePage wizard/></EventManageRoute>,
	},
	notFoundRoute,
];

function EventManagePage({wizard = false}: Readonly<{ wizard?: boolean }>): JSX.Element {
	const EventWizard = lazy(() => import('./wizard/EventWizard'));
	const EventEditPage = lazy(() => import('./edit/EventEditPage'));

	return <Suspense fallback={<></>}>
		{wizard ? <EventWizard/> : <EventEditPage/>}
	</Suspense>;
}

export type EventPageParams = {
	eventId: string,
}
