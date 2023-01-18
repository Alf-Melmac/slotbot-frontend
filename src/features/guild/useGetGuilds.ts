import slotbotServerClient from '../../hooks/slotbotServerClient';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {GuildDetailsDto, GuildDto, UserInGuildDto} from './guildTypes';

export function useGetGuilds(): UseQueryResult<Array<GuildDto>, Error> {
	const getGuilds = () => slotbotServerClient.get('/guilds').then((res) => res.data);
	return useQuery<Array<GuildDto>, Error>(['guilds'], getGuilds);
}

export function useGetGuild(guildId: string): UseQueryResult<GuildDetailsDto, Error> {
	const getGuild = () => slotbotServerClient.get(`/guilds/${guildId}`).then((res) => res.data);
	return useQuery<GuildDetailsDto, Error>(['guilds', guildId], getGuild);
}

export function useGetGuildUsers(guildId: string): UseQueryResult<UserInGuildDto[], Error> {
	const getGuildUsers = () => slotbotServerClient.get(`/guilds/${guildId}/users`).then((res) => res.data);
	return useQuery<UserInGuildDto[], Error>([`guildUsers-${guildId}`], getGuildUsers);
}
