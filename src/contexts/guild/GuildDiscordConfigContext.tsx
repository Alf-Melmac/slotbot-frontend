import {createContext, JSX, PropsWithChildren, useContext} from 'react';
import {useGetDiscordIntegration} from '../../features/guilds/guild/useGetGuild';

type GuildDiscordConfig = ReturnType<typeof useGetDiscordIntegration>

const GuildDiscordConfigContext = createContext<GuildDiscordConfig | undefined>(undefined);

export function GuildDiscordConfigProvider(props: Readonly<PropsWithChildren<GuildDiscordConfig>>): JSX.Element {
	const {children, ...query} = props;

	return <GuildDiscordConfigContext.Provider value={query}>{children}</GuildDiscordConfigContext.Provider>;
}

export function useGuildDiscordConfig(): GuildDiscordConfig {
	const context = useContext(GuildDiscordConfigContext);
	if (context === undefined) {
		throw new Error('useGuildDiscordConfig must be used within a GuildDiscordConfigProvider');
	}
	return context;
}
