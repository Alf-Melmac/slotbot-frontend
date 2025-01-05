import slotbotServerClient from '../../../../hooks/slotbotServerClient';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {EventTypeDto} from '../../eventTypes';
import {useGuildContext} from '../../../../contexts/guildcontext/GuildContext';
import {useEventAction} from '../../../../contexts/event/action/EventActionContext';

export function useGetEventTypes(): UseQueryResult<EventTypeDto[], Error> {
	const {ownerGuild} = useEventAction();
	if (ownerGuild) {
		return useGetEventTypeForGuild(ownerGuild);
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
