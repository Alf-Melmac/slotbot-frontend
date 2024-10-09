import {createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useMemo, useState} from 'react';

type GuildContextType = {
	guild: string;
	setGuild: Dispatch<SetStateAction<string>>;
	guildUrlPath: string;
}

const GuildContext = createContext<GuildContextType | undefined>(undefined);

export function GuildProvider(props: Readonly<PropsWithChildren>) {
	const {children} = props;
	const [guild, setGuild] = useState<string>('');

	const contextValue = useMemo(() => {
		return {
			guild: guild,
			setGuild: setGuild,
			guildUrlPath: guild ? `/${guild}` : '',
		};
	}, [guild, setGuild]);

	return <GuildContext.Provider value={contextValue}>{children}</GuildContext.Provider>;
}

export function useGuildContext() {
	const context = useContext(GuildContext);
	if (context === undefined) {
		throw new Error('useGuildContext must be used within a GuildProvider');
	}
	return context;
}
