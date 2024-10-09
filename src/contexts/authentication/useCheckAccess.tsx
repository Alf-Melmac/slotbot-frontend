import {ApplicationRoles} from './authenticationTypes';
import slotbotServerClient from '../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';
import {useGuildContext} from '../guildcontext/GuildContext';

/**
 * Checks for the given authority in the given guild. Fallbacks to false while loading.
 *
 * @see useCheckAccessQuery
 */
export function useCheckAccess(authority?: ApplicationRoles, guildId?: string, eventId?: number): boolean {
	const {accessAllowed} = useCheckAccessQuery(authority, guildId, eventId);
	return accessAllowed ?? false;
}

export function useCheckAccessQuery(authority?: ApplicationRoles, guildId?: string, eventId?: number) {
	const {guildUrlPath} = useGuildContext();
	const getAllowedToAccess = () => slotbotServerClient.get(`/authentication${guildUrlPath}/access/${authority}`, {params: {guildId, eventId}})
		.then((res) => res.data);
	const query = useQuery<boolean>({
		queryKey: ['allowedToAccess', guildUrlPath, authority, guildId, eventId],
		queryFn: getAllowedToAccess,
		enabled: !!authority,
	});
	const accessAllowed = query.data;

	return {query, accessAllowed};
}
