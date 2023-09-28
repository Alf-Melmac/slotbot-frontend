import {createContext, PropsWithChildren, useContext, useMemo} from 'react';

type GuildPage = {
	guildId: string;
	isAdmin: boolean;
}

const GuildPageContext = createContext<GuildPage | undefined>(undefined);

export function GuildPageProvider(props: PropsWithChildren<GuildPage>): JSX.Element {
	const {guildId, isAdmin, children} = props;

	const contextValue = useMemo(() => {
		return {
			guildId: guildId,
			isAdmin: isAdmin,
		};
	}, [guildId, isAdmin]);
	return <GuildPageContext.Provider value={contextValue}>{children}</GuildPageContext.Provider>;
}

export function useGuildPage(): GuildPage {
	const context = useContext(GuildPageContext);
	if (context === undefined) {
		throw new Error('useGuild must be used within a GuildProvider');
	}
	return context;
}
