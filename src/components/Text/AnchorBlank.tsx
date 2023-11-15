import {Anchor} from '@mantine/core';
import {JSX, ReactNode} from 'react';

type AnchorBlankProps = {
	href: string;
	className?: string;
	children: ReactNode;
};

export function AnchorBlank(props: Readonly<AnchorBlankProps>): JSX.Element {
	return (
		<Anchor href={props.href} className={props.className} target={'_blank'}
				rel={'noopener noreferrer'}>{props.children}</Anchor>
	);
}
