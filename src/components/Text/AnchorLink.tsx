import {Anchor} from '@mantine/core';
import {Link} from 'react-router-dom';
import {ReactNode} from 'react';
import {To} from 'react-router';

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
