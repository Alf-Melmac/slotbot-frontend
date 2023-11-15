import {Anchor} from '@mantine/core';
import {Link, To} from 'react-router-dom';
import {JSX, ReactNode} from 'react';

export type ReactRouterAnchorProps = {
	to: To;
	children: ReactNode;
	className?: string;
};

export function AnchorLink(props: Readonly<ReactRouterAnchorProps>): JSX.Element {
	const {to, children, className} = props;

	return (
		<Anchor component={Link} to={to} className={className}>
			{children}
		</Anchor>
	);
}
