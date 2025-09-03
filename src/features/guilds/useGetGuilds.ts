import slotbotServerClient from '../../hooks/slotbotServerClient';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {GuildDto, GuildsCategorisedDto} from './guildTypes';

export function useGetGuilds(): UseQueryResult<GuildDto[], Error> {
	const getGuilds = () => slotbotServerClient.get('/guilds').then((res) => res.data);
	return useQuery({
		queryKey: ['guilds'],
		queryFn: getGuilds,
	});
}

export function useGetGuildsCategorised(): UseQueryResult<GuildsCategorisedDto, Error> {
	const getGuildsCategorised = () => slotbotServerClient.get('/guilds/categorised').then((res) => res.data);
	return useQuery({
		queryKey: ['guilds', 'categorised'],
		queryFn: getGuildsCategorised,
	});
}
