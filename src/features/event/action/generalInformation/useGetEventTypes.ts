import slotbotServerClient from '../../../../hooks/slotbotServerClient';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {EventTypeDto} from '../../eventTypes';
import {useGuildContext} from '../../../../contexts/guildcontext/GuildContext';

export function useGetEventTypes(guildId?: string): UseQueryResult<EventTypeDto[], Error> {
	const {guild} = useGuildContext();
	const guildIdentifierUrl = guild ? `/guild/${guild}` : '';
	const guildPath = guildId ? `/${guildId}` : guildIdentifierUrl;
	const getEventTypes = () => slotbotServerClient.get(`/events/types${guildPath}`).then((res) => res.data);
	return useQuery<EventTypeDto[], Error>({
		queryKey: ['eventTypes', guildId],
		queryFn: getEventTypes,
	});
}
