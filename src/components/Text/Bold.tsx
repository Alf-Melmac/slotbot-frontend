import {Text} from '@mantine/core';
import {JSX, ReactNode} from 'react';

type BoldProps = {
	children: ReactNode;
};

export function Bold(props: Readonly<BoldProps>): JSX.Element {
	return (
		<Text weight={'bold'} span>{props.children}</Text>
	);
}
