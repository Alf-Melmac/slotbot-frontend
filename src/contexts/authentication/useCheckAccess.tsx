import {useEffect, useState} from 'react';
import {ApplicationRoles} from './authenticationTypes';
import slotbotServerClient from '../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';

export function useCheckAccess(authority?: ApplicationRoles, guildId?: string): boolean {
	const [allowed, setAllowed] = useState(false);

	const {query, accessAllowed} = useCheckAccessQuery(authority, guildId);
	useEffect(() => {
		if (query.isSuccess) {
			setAllowed(accessAllowed || false);
		}
	}, [accessAllowed]);

	return allowed;
}

export function useCheckAccessQuery(authority?: ApplicationRoles, guildId?: string) {
	const getAllowedToAccess = () => slotbotServerClient.get(`/authentication/access/${authority}`, {params: {guild: guildId}})
		.then((res) => res.data);
	const query = useQuery<boolean>(['allowedToAccess', authority, guildId], getAllowedToAccess, {enabled: !!authority});
	const accessAllowed = query.data;

	return {query, accessAllowed};
}
