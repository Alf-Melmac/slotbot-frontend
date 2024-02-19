import {Text, TextProps} from '@mantine/core';
import {JSX, PropsWithChildren} from 'react';

export function Bold(props: Readonly<PropsWithChildren<TextProps>>): JSX.Element {
	return <Text {...props} fw={'bold'}>{props.children}</Text>;
}
