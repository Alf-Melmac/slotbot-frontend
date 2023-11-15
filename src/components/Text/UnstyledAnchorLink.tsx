import {AnchorLink, ReactRouterAnchorProps} from './AnchorLink';
import {createStyles} from '@mantine/core';
import {JSX} from 'react';

const useStyles = createStyles(() => ({
	link: {
		color: 'inherit',

		'&:hover': {
			textDecoration: 'unset',
		},
	},
}));

export function UnstyledAnchorLink(props: Readonly<ReactRouterAnchorProps>): JSX.Element {
	const {classes, cx} = useStyles();

	// noinspection RequiredAttributes children is provided by props
	return <AnchorLink {...props} className={cx(classes.link, props.className)}/>;
}
