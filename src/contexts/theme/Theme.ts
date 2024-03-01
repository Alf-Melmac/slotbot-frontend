import {createTheme, MantineProviderProps, MantineThemeOverride, rem} from '@mantine/core';
import {merge} from 'lodash';

export enum Guild {
	AMB,
	DAA,
	TTT,
	SLOTBOT,
}

type AdvancedGuild = {
	guild: Guild,
	urlPattern: RegExp,
}
const advancedGuilds: AdvancedGuild[] = [
	{
		guild: Guild.AMB,
		urlPattern: /.*armamachtbock.de.*/,
	},
	{
		guild: Guild.DAA,
		urlPattern: /.*deutsche-arma-allianz.de.*/,
	},
	{
		guild: Guild.TTT,
		urlPattern: /.*tacticalteam.de.*/,
	},
];

export function getGuild(): Guild {
	for (const advancedGuild of advancedGuilds) {
		if (advancedGuild.urlPattern.test(window.location.origin)) {
			return advancedGuild.guild;
		}
	}

	return Guild.SLOTBOT;
}

const globalTheme: ReturnType<typeof createTheme> = {
	colors: {
		dark: [
			'#C1C2C5',
			'#A6A7AB',
			'#909296',
			'#5c5f66',
			'#373A40',
			'#2C2E33',
			'#25262b',
			'#1A1B1E',
			'#141517',
			'#101113',
		],
	},

	fontFamily: 'Roboto,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',

	fontSizes: {
		xs: rem(12),
		sm: rem(14),
		md: rem(16),
		lg: rem(18),
		xl: rem(20),
	},

	headings: {
		sizes: {
			h1: {fontSize: rem(36), fontWeight: '400', lineHeight: rem(54)},
			h2: {fontSize: rem(28), fontWeight: '400', lineHeight: rem(42)},
			h3: {fontSize: rem(20), fontWeight: '400', lineHeight: rem(30)},
			h4: {fontSize: rem(18), fontWeight: '400', lineHeight: rem(27)},
			h5: {fontSize: rem(16), fontWeight: '600', lineHeight: rem(24)},
			h6: {fontSize: rem(16), fontWeight: '400', lineHeight: rem(24)},
		},
	},

	components: {
		Container: {
			defaultProps: {size: 'lg'},
		},
		DateInput: {
			defaultProps: {
				valueFormat: 'L',
			},
		},
	},

	other: {
		guild: getGuild(),
	},
};

export function getThemeOverride(): MantineProviderProps['theme'] {
	switch (getGuild()) {
		case Guild.DAA:
			return themeDAA;
		case Guild.TTT:
			return themeTTT;
		case Guild.AMB:
		case Guild.SLOTBOT:
		default:
			return themeAMB;
	}
}

const themeAMB: MantineThemeOverride = createTheme({
	primaryColor: 'cyan',

	...globalTheme,
});

const themeDAA: MantineThemeOverride = {
	primaryColor: 'yellow',

	...globalTheme,
};

const themeTTT: MantineThemeOverride = merge(
	{
		colors: {
			brand: [
				'#f2f8ec',
				'#e7ece1',
				'#cfd6c4',
				'#b4c0a5',
				'#9eac8a',
				'#8fa079',
				'#879a6f',
				'#74865d',
				'#667751',
				'#576741',
			],
		},
		primaryColor: 'brand',
	} satisfies MantineThemeOverride,
	globalTheme,
);
