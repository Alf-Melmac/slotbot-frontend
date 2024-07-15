import {Anchor, AnchorProps, PolymorphicComponentProps} from '@mantine/core';
import {JSX, ReactNode} from 'react';

type AnchorBlankProps = {
	href: string;
	children: ReactNode;
} & Pick<PolymorphicComponentProps<'a', AnchorProps>, 'href' | 'className' | 'size'>;

export function AnchorBlank(props: Readonly<AnchorBlankProps>): JSX.Element {
	const {href, children, ...anchorProps} = props;
	return (
		<Anchor href={href} {...anchorProps} target={'_blank'} rel={'noopener noreferrer'}>{props.children}</Anchor>
	);
}
