import slotbotServerClient from '../../hooks/slotbotServerClient';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {GuildDto} from './guildTypes';

export function useGetGuilds(): UseQueryResult<Array<GuildDto>, Error> {
	const getGuilds = () => slotbotServerClient.get('/guilds').then((res) => res.data);
	return useQuery<Array<GuildDto>, Error>(['guilds'], getGuilds);
}
