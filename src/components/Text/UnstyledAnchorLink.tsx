import {AnchorLink, ReactRouterAnchorProps} from './AnchorLink';
import {createStyles} from '@mantine/core';

const useStyles = createStyles(() => ({
    link: {
        color: 'inherit',

        '&:hover': {
            textDecoration: 'unset',
        }
    },
}));

export function UnstyledAnchorLink(props: ReactRouterAnchorProps): JSX.Element {
    const {classes, cx} = useStyles();

    return <AnchorLink {...props} className={cx(classes.link, props.className)}/>;
}
