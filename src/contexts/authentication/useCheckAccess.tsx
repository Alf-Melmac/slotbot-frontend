import {ApplicationRoles} from './authenticationTypes';
import slotbotServerClient from '../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';

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
	const getAllowedToAccess = () => slotbotServerClient.get(`/authentication/access/${authority}`, {params: {guildId, eventId}})
		.then((res) => res.data);
	const query = useQuery<boolean>({
		queryKey: ['allowedToAccess', authority, guildId],
		queryFn: getAllowedToAccess,
		enabled: !!authority,
	});
	const accessAllowed = query.data;

	return {query, accessAllowed};
}
