import {MantineThemeOverride} from "@mantine/core";

export enum Guild {
	AMB,
	DAA,
	SLOTBOT ,
}

type AdvancedGuild = {
	guild: Guild,
	urlPattern: RegExp,
}
const advancedGuilds: AdvancedGuild[] = [
	{
		guild: Guild.AMB,
		urlPattern: /.*test1.*/,
	},
	{
		guild: Guild.DAA,
		urlPattern: /.*test2.*/,
	}
]

export function getGuild(): Guild {
	for (const advancedGuild of advancedGuilds) {
		if (advancedGuild.urlPattern.test(window.location.origin)) {
			console.info(Guild[advancedGuild.guild]);
			return advancedGuild.guild;
		}
	}

	return Guild.SLOTBOT;
}

const globalTheme: MantineThemeOverride = {
	datesLocale: 'de',
	dateFormat: 'DD.MM.YYYY',

	fontFamily: 'Roboto Condensed, sans-serif',

	headings: {
		fontFamily: 'Roboto Regular, sans-serif',
		sizes: {
			h1: {fontSize: 40},
		},
	},

	components: {
		Container: {
			defaultProps: {size: 'lg'},
		},
	},

	other: {
		guild: getGuild(),
	}
};

export function getThemeOverride() {
	switch (getGuild()) {
		case Guild.DAA:
			return themeDAA;
		case Guild.AMB:
		case Guild.SLOTBOT:
		default:
			return themeAMB;
	}
}

const themeAMB: MantineThemeOverride = {
	primaryColor: 'cyan',

	globalStyles: (theme) => ({
		body: {
			marginTop: 0,
			marginBottom: 0,
		},
		'body, main': {
			backgroundColor: theme.colorScheme !== 'dark' ? theme.colors.gray[1] : theme.colors.dark[7],
		},
		'*::-webkit-scrollbar': {
			width: 8,
		},
		'*::-webkit-scrollbar-thumb': {
			backgroundColor: theme.colors.gray[5],
			borderRadius: "6px",
		},
		'@supports (-moz-appearance:none)': {
			"*": {
				/*The following attributes are currently supported only by Firefox. Webkit browsers are designed by the ::-webkit-scrollbar
				So that nothing is broken in potential future support, these values are set only for Firefox.*/
				scrollbarColor: `${theme.colors.gray[5]} transparent`,
				scrollbarWidth: 'thin',
			},
		},
	}),

	...globalTheme,
};

const themeDAA: MantineThemeOverride = {
	primaryColor: 'yellow',

	globalStyles: (theme) => ({
		body: {
			marginTop: 0,
			marginBottom: 0,
		},
		'body, main': {
			backgroundColor: theme.colorScheme !== 'dark' ? theme.colors.gray[1] : theme.colors.gray[9],
		},
		'*::-webkit-scrollbar': {
			width: 8,
		},
		'*::-webkit-scrollbar-thumb': {
			backgroundColor: theme.colors.gray[5],
			borderRadius: "6px",
		},
		'@supports (-moz-appearance:none)': {
			"*": {
				/*The following attributes are currently supported only by Firefox. Webkit browsers are designed by the ::-webkit-scrollbar
				So that nothing is broken in potential future support, these values are set only for Firefox.*/
				scrollbarColor: `${theme.colors.gray[5]} transparent`,
				scrollbarWidth: 'thin',
			},
		},
	}),

	...globalTheme,
};
