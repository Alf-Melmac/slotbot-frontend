import {Navigate, RouteObject} from 'react-router-dom';
import {EventDetails} from './details/EventDetails';
import {Events} from './calendar/Events';
import {notFoundRoute} from '../error/ErrorRoutes';
import {JSX, lazy, PropsWithChildren, Suspense} from 'react';
import {RequireAuth} from '../../contexts/authentication/RequireAuth';
import {ApplicationRoles} from '../../contexts/authentication/authenticationTypes';
import {GUILD_CONTEXT_PATH_PARAM, GuildContextPage} from '../../contexts/guildcontext/GuildContextPage';

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
		path: 'calendar',
		element: <Navigate to={'/events'} replace/>,
	},
	{
		path: `calendar/${GUILD_CONTEXT_PATH_PARAM}`,
		element: <GuildContextPage><Events/></GuildContextPage>,
	},
	{
		path: ':eventId/*',
		children: existingEventRoutes,
	},
	{
		path: `${GUILD_CONTEXT_PATH_PARAM}/new`,
		element: <EventManageRoute><GuildContextPage><EventManagePage wizard/></GuildContextPage></EventManageRoute>,
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
