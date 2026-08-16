import {TextVariant} from '@mantine/core';

type ExtendedTextVariant = TextVariant | 'secondary';

declare module '@mantine/core' {
	export interface TextProps {
		variant?: ExtendedTextVariant;
	}
}
