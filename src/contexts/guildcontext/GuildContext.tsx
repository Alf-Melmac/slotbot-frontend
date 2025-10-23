import {createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useMemo, useState} from 'react';

type GuildContextType = {
	guild: string;
	setGuild: Dispatch<SetStateAction<string>>;
	guildUrlPath: string;
}

const GuildContext = createContext<GuildContextType | undefined>(undefined);

export enum Guild {
	AMB,
	DAA,
	TTT,
	GTO,
	SLOTBOT,
}

type AdvancedGuild = {
	guild: Guild,
	urlPattern: RegExp,
	identifier: string,
}

const advancedGuilds: AdvancedGuild[] = [
	{
		guild: Guild.AMB,
		urlPattern: /.*armamachtbock.de.*/,
		identifier: 'AMB',
	},
	{
		guild: Guild.DAA,
		urlPattern: /.*deutsche-arma-allianz.de.*/,
		identifier: 'DAA',
	},
	{
		guild: Guild.TTT,
		urlPattern: /.*tacticalteam.de.*/,
		identifier: 'TTT',
	},
	{
		guild: Guild.GTO,
		urlPattern: /.*gto-kompanie.de.*/,
		identifier: 'GTO',
	},
];

function detectAdvancedGuild(): AdvancedGuild | null {
	for (const advancedGuild of advancedGuilds) {
		if (advancedGuild.urlPattern.test(globalThis.location.origin)) {
			return advancedGuild;
		}
	}
	return null;
}

function detectGuildIdentifier(): string {
	return detectAdvancedGuild()?.identifier ?? '';
}

export function useGetGuild(): Guild {
	const detected = detectAdvancedGuild();
	return detected?.guild ?? Guild.SLOTBOT;
}

export function GuildProvider(props: Readonly<PropsWithChildren>) {
	const {children} = props;
	const [guild, setGuild] = useState<string>(detectGuildIdentifier);

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
