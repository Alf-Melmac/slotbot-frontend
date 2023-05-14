import {CSSObject} from "@mantine/core";

export const flexGrow: CSSObject = {
	// @ts-ignore
	flexGrow: '1 !important',
};

export const underlineOnHover: CSSObject = {
	'&:hover': {
		cursor: 'pointer',
		textDecoration: 'underline',
	},
};

export const hidden: CSSObject = {
	display: 'none',
}
