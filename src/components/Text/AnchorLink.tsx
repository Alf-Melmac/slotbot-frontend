import {Anchor, AnchorProps} from '@mantine/core';
import {Link, LinkProps} from 'react-router';
import {JSX, ReactNode} from 'react';

export type ReactRouterAnchorProps = {
	to: LinkProps['to'];
	children: ReactNode;
} & Pick<AnchorProps, 'className' | 'visibleFrom' | 'w' | 'size'>;

export function AnchorLink(props: Readonly<ReactRouterAnchorProps>): JSX.Element {
	const {to, children, ...anchorProps} = props;

	return (
		<Anchor component={Link} to={to} {...anchorProps}>
			{children}
		</Anchor>
	);
}
