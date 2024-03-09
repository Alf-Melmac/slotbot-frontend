import {AnchorLink, ReactRouterAnchorProps} from './AnchorLink';
import {JSX, PropsWithChildren} from 'react';
import cx from 'clsx';
import classes from './UnstyledAnchorLink.module.css';

export function UnstyledAnchorLink(props: Readonly<PropsWithChildren<ReactRouterAnchorProps>>): JSX.Element {
	return <AnchorLink {...props} className={cx(classes.link, props.className)}>{props.children}</AnchorLink>;
}
