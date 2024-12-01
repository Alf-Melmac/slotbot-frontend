import slotbotServerClient from '../../../../hooks/slotbotServerClient';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {EventTypeDto} from '../../eventTypes';
import {useGuildContext} from '../../../../contexts/guildcontext/GuildContext';

export function useGetEventTypes(guildId?: string): UseQueryResult<EventTypeDto[], Error> {
	if (guildId) {
		return useGetEventTypeForGuild(guildId);
	}
	const {guild} = useGuildContext();
	const getEventTypes = () => slotbotServerClient.get(`/events/types/guild/${guild}`).then((res) => res.data);
	return useQuery<EventTypeDto[], Error>({
		queryKey: ['eventTypesByIdentifier', guild],
		queryFn: getEventTypes,
	});
}

export function useGetEventTypeForGuild(guildId: string): UseQueryResult<EventTypeDto[], Error> {
	const getEventTypes = () => slotbotServerClient.get(`/events/types/${guildId}`).then((res) => res.data);
	return useQuery<EventTypeDto[], Error>({
		queryKey: ['eventTypes', guildId],
		queryFn: getEventTypes,
	});
}
