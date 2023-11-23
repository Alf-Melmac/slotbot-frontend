import {Text, TextProps} from '@mantine/core';
import {JSX} from 'react';

export function Bold(props: Readonly<TextProps>): JSX.Element {
	return <Text {...props} weight={'bold'}/>;
}
