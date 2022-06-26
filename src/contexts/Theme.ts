import {MantineThemeOverride} from "@mantine/core";

export const theme: MantineThemeOverride = {
	primaryColor: 'cyan',
	datesLocale: 'de',

	headings: {
		sizes: {
			h1: {fontSize: 40},
		},
	},

	components: {
		Container: {
			defaultProps: {size: 'lg'}
		}
	}
};
