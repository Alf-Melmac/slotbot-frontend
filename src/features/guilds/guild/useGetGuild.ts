import {QueryFunction, QueryKey, useInfiniteQuery, useQuery, UseQueryResult} from '@tanstack/react-query';
import {GuildConfigDto, GuildDetailsDto, GuildDiscordIntegrationDto, UserInGuildDto} from '../guildTypes';
import slotbotServerClient from '../../../hooks/slotbotServerClient';
import {FrontendPageable} from '../../../utils/pagination';

export function useGetGuild(guildId: string): UseQueryResult<GuildDetailsDto, Error> {
	const getGuild = () => slotbotServerClient.get(`/guilds/${guildId}`).then((res) => res.data);
	return useQuery<GuildDetailsDto, Error>({
		queryKey: ['guilds', guildId],
		queryFn: getGuild,
	});
}

export function useGetGuildConfig(guildId: string): UseQueryResult<GuildConfigDto, Error> {
	const getGuildConfig = () => slotbotServerClient.get(`/guilds/${guildId}/config`).then((res) => res.data);
	return useQuery<GuildConfigDto, Error>({
		queryKey: ['guilds', guildId, 'config'],
		queryFn: getGuildConfig,
	});
}

export function useGetDiscordIntegration(guildId: string): UseQueryResult<GuildDiscordIntegrationDto, Error> {
	const getDiscordIntegration = () => slotbotServerClient.get(`/guilds/${guildId}/discord`).then((res) => res.data);
	return useQuery<GuildDiscordIntegrationDto, Error>({
		queryKey: ['guilds', guildId, 'discord'],
		queryFn: getDiscordIntegration,
	});
}

export function useGetGuildUsers(guildId: string) {
	const getGuildUsers: QueryFunction<FrontendPageable<UserInGuildDto>, QueryKey, unknown> = ({pageParam}) => slotbotServerClient.get(`/guilds/${guildId}/users?size=5&page=${pageParam}`).then((res) => res.data);
	return useInfiniteQuery<FrontendPageable<UserInGuildDto>, Error>({
		queryKey: ['guildUsers', guildId],
		queryFn: getGuildUsers,
		initialPageParam: 0,
		getNextPageParam: (lastPage, _allPages) => {
			const {totalPages, number} = lastPage.page;
			if (number < totalPages - 1) {
				return number + 1;
			}
			return undefined;
		},
	});
}
