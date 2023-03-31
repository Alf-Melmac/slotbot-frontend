import {ApplicationRoles} from './authenticationTypes';
import slotbotServerClient from '../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';

/**
 * Checks for the given authority in the given guild. Fallbacks to false while loading.
 *
 * @see useCheckAccessQuery
 */
export function useCheckAccess(authority?: ApplicationRoles, guildId?: string): boolean {
	const {accessAllowed} = useCheckAccessQuery(authority, guildId);
	return accessAllowed || false;
}

export function useCheckAccessQuery(authority?: ApplicationRoles, guildId?: string) {
	const getAllowedToAccess = () => slotbotServerClient.get(`/authentication/access/${authority}`, {params: {guild: guildId}})
		.then((res) => res.data);
	const query = useQuery<boolean>(['allowedToAccess', authority, guildId], getAllowedToAccess, {enabled: !!authority});
	const accessAllowed = query.data;

	return {query, accessAllowed};
}
