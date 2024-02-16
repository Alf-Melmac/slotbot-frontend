import {Text, TextProps} from '@mantine/core';
import {JSX} from 'react';

export function Italic(props: Readonly<TextProps>): JSX.Element {
	return <Text {...props} fs={'italic'} span/>;
}
