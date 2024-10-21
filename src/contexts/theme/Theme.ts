import {createTheme, MantineProviderProps, MantineThemeOverride, rem} from '@mantine/core';
import {merge} from 'lodash-es';
import {useLanguage} from '../language/Language';
import {RichTextEditorLabels} from '@mantine/tiptap';
import {useGuildContext} from '../guildcontext/GuildContext';
import {useEffect} from 'react';

export enum Guild {
	AMB,
	DAA,
	TTT,
	FortyThird,
	CSA,
	OPT,
	GTO,
	R,
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
		guild: Guild.FortyThird,
		urlPattern: /.*the-43rd.slotbot.de.*/,
		identifier: '43rd',
	},
	{
		guild: Guild.CSA,
		urlPattern: /.*csa.slotbot.de.*/,
		identifier: 'CSA',
	},
	{
		guild: Guild.OPT,
		urlPattern: /.*opt.slotbot.de.*/,
		identifier: 'OPT',
	},
	{
		guild: Guild.GTO,
		urlPattern: /.*gto.slotbot.de.*/,
		identifier: 'GTO',
	},
	{
		guild: Guild.R,
		urlPattern: /.*r.slotbot.de.*/,
		identifier: 'R',
	},
];

export function useGetGuild(): Guild {
	const {guild, setGuild} = useGuildContext();

	let detectedGuild: AdvancedGuild | undefined = undefined;
	for (const advancedGuild of advancedGuilds) {
		if (advancedGuild.urlPattern.test(window.location.origin)) {
			detectedGuild = advancedGuild;
			break;
		}
	}

	useEffect(() => {
		if (!guild && detectedGuild) {
			setGuild(detectedGuild.identifier);
		}
	}, [detectedGuild]);

	return detectedGuild?.guild ?? Guild.SLOTBOT;
}

function useGetGlobalTheme(): ReturnType<typeof createTheme> {
	const {t} = useLanguage();

	return {
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
			RichTextEditor: {
				defaultProps: {
					labels: {
						boldControlLabel: t('editor.control.bold'),
						hrControlLabel: t('editor.control.hr'),
						italicControlLabel: t('editor.control.italic'),
						underlineControlLabel: t('editor.control.underline'),
						strikeControlLabel: t('editor.control.strikethrough'),
						linkControlLabel: t('editor.control.link.add'),
						unlinkControlLabel: t('editor.control.link.remove'),
						bulletListControlLabel: t('editor.control.list.bullet'),
						orderedListControlLabel: t('editor.control.list.ordered'),
						h1ControlLabel: t('editor.control.headings.1'),
						h2ControlLabel: t('editor.control.headings.2'),
						h3ControlLabel: t('editor.control.headings.3'),
						blockquoteControlLabel: t('editor.control.blockquote'),
						alignLeftControlLabel: t('editor.control.align.left'),
						alignCenterControlLabel: t('editor.control.align.center'),
						alignRightControlLabel: t('editor.control.align.right'),
						alignJustifyControlLabel: t('editor.control.align.justify'),
						highlightControlLabel: t('editor.control.highlight'),
						undoControlLabel: t('editor.control.undo'),
						redoControlLabel: t('editor.control.redo'),
						linkEditorInputLabel: t('editor.linkEditor.inputLabel'),
						linkEditorSave: t('action.save'),
					} as RichTextEditorLabels,
				},
			},
		},

		other: {
			guild: useGetGuild(),
		},
	};
}

export function useGetThemeOverride(): MantineProviderProps['theme'] {
	let theme;
	switch (useGetGuild()) {
		case Guild.DAA:
			theme = themeDAA;
			break;
		case Guild.TTT:
			theme = themeTTT;
			break;
		case Guild.AMB:
		case Guild.SLOTBOT:
		default:
			theme = themeAMB;
			break;
	}
	return merge(theme, useGetGlobalTheme());
}

const themeAMB: MantineThemeOverride = createTheme({
	primaryColor: 'cyan',
});

const themeDAA: MantineThemeOverride = {
	primaryColor: 'yellow',
};

const themeTTT: MantineThemeOverride = {
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
};
