import {Anchor} from '@mantine/core';
import {Link, To} from 'react-router-dom';
import {ReactNode} from 'react';

type ReactRouterAnchorProps = {
	to: To;
	children: ReactNode;
	className?: string;
};

export function AnchorLink(props: ReactRouterAnchorProps): JSX.Element {
	return (
		<Anchor component={Link} to={props.to} className={props.className}>
			{props.children}
		</Anchor>
	);
}
