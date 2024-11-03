import {RouteObject, useParams} from 'react-router-dom';
import {notFoundRoute} from '../error/ErrorRoutes';
import {Guilds} from './Guilds';
import {Guild} from './guild/Guild';
import {RequireAuth} from '../../contexts/authentication/RequireAuth';
import {ApplicationRoles} from '../../contexts/authentication/authenticationTypes';
import {JSX, lazy, Suspense} from 'react';

const existingGuildRoutes: RouteObject[] = [
	{
		path: '',
		element: <Guild/>,
	},
	{
		path: 'edit',
		element: <GuildEdit/>,
	},
	notFoundRoute,
];

function GuildEdit(): JSX.Element {
	const {guildId} = useParams<GuildPageParams>();

	const GuildEdit = lazy(() => import('./guild/config/GuildConfig'));
	return <Suspense fallback={<></>}>
		<RequireAuth authority={ApplicationRoles.ROLE_ADMIN} guildId={guildId}><GuildEdit/></RequireAuth>
	</Suspense>;
}

export const guildRoutes: RouteObject[] = [
	{
		element: <Guilds/>,
		index: true,
	},
	{
		path: ':guildId/*',
		children: existingGuildRoutes,
	},
	notFoundRoute,
];

export type GuildPageParams = {
	guildId: string;
};
