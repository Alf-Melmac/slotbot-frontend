import {Text, TextProps} from '@mantine/core';
import {JSX, PropsWithChildren} from 'react';

export function Italic(props: Readonly<PropsWithChildren<TextProps>>): JSX.Element {
	return <Text {...props} fs={'italic'} span>{props.children}</Text>;
}
