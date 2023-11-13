import slotbotServerClient from '../../../../hooks/slotbotServerClient';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {EventTypeDto} from '../../eventTypes';

export function useGetEventTypes(guildId?: string): UseQueryResult<EventTypeDto[], Error> {
	const guild = guildId ? `/${guildId}` : '';
	const getEventTypes = () => slotbotServerClient.get(`/events/types${guild}`).then((res) => res.data);
	return useQuery<EventTypeDto[], Error>({
		queryKey: ['eventTypes', guildId],
		queryFn: getEventTypes,
	});
}
