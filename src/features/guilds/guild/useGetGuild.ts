import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {GuildConfigDto, GuildDetailsDto, UserInGuildDto} from '../guildTypes';
import slotbotServerClient from '../../../hooks/slotbotServerClient';

export function useGetGuild(guildId: string): UseQueryResult<GuildDetailsDto, Error> {
	const getGuild = () => slotbotServerClient.get(`/guilds/${guildId}`).then((res) => res.data);
	return useQuery<GuildDetailsDto, Error>(['guilds', guildId], getGuild);
}

export function useGetGuildConfig(guildId: string): UseQueryResult<GuildConfigDto, Error> {
	const getGuildConfig = () => slotbotServerClient.get(`/guilds/${guildId}/config`).then((res) => res.data);
	return useQuery<GuildConfigDto, Error>(['guilds', guildId, 'config'], getGuildConfig);
}

export function useGetGuildUsers(guildId: string): UseQueryResult<UserInGuildDto[], Error> {
	const getGuildUsers = () => slotbotServerClient.get(`/guilds/${guildId}/users`).then((res) => res.data);
	return useQuery<UserInGuildDto[], Error>(['guildUsers', guildId], getGuildUsers);
}
