import {Anchor} from '@mantine/core';
import {Link, To} from 'react-router-dom';
import {ReactNode} from 'react';

type ReactRouterAnchorProps = {
	to: To;
	children: ReactNode;
	className?: string;
	externalLink?: boolean;
};

export function AnchorLink(props: ReactRouterAnchorProps): JSX.Element {
	const {to, children, className, externalLink = false} = props;

	return (
		<>
			{externalLink ?
				<Anchor href={to as string} className={className}>
					{children}
				</Anchor>
				:
				<Anchor component={Link} to={to} className={className}>
					{children}
				</Anchor>
			}
		</>
	);
}
