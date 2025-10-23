import {useGuildContext} from '../../contexts/guildcontext/GuildContext';
import slotbotServerClient from '../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';

export function useHomeNavigation(): boolean | null {
	const {guild} = useGuildContext();

	const getGuildAdvanced = () => slotbotServerClient.get(`/guilds/${guild}/advanced`).then((res) => res.data);
	const {data, isLoading} = useQuery<boolean, Error>({
		queryKey: ['guildAdvanced', guild],
		queryFn: getGuildAdvanced,
		staleTime: 1000 * 60 * 60,
		enabled: !!guild,
	});
	if (isLoading) {
		return null;
	}

	return !!data;
}

export function useHomeNavigationPath(): string {
	const homeNavigation = useHomeNavigation();
	const {guildUrlPath} = useGuildContext();
	const calendarUrl = guildUrlPath ? `/events/calendar${guildUrlPath}` : '/events';
	return homeNavigation ? '/' : calendarUrl;
}
