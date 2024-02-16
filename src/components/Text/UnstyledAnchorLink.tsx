import {AnchorLink, ReactRouterAnchorProps} from './AnchorLink';
import {JSX} from 'react';
import cx from 'clsx';
import classes from './UnstyledAnchorLink.module.css';

export function UnstyledAnchorLink(props: Readonly<ReactRouterAnchorProps>): JSX.Element {
    // noinspection RequiredAttributes children is provided by props
    return <AnchorLink {...props} className={cx(classes.link, props.className)}/>;
}
