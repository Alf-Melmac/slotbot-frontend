import {Box, BoxProps, Center, MantineStyleProps, Text} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {AnchorLink, ReactRouterAnchorProps} from '../Text/AnchorLink';
import {TextKey} from '../../contexts/language/Language';
import {T} from '../T';
import {JSX} from 'react';
import cx from 'clsx';
import classes from './NavIcon.module.css';

interface NavIconProps {
	text: TextKey;
	icon: IconProp;
	width: MantineStyleProps['w'];
	className?: BoxProps['className'];
}

type NavIconLinkProps = NavIconProps & {
	link: ReactRouterAnchorProps['to'];
} & Pick<ReactRouterAnchorProps, 'visibleFrom'>;

interface NavIconActionProps extends NavIconProps {
	onClick?: () => void;
}

function NavIcon(props: Readonly<NavIconProps>): JSX.Element {
	return (
		<>
			<Text size={'sm'}><T k={props.text}/></Text>
			<Center className={classes.icon}>
				<FontAwesomeIcon icon={props.icon}/>
			</Center>
		</>
	);
}

export function NavIconLink(props: Readonly<NavIconLinkProps>): JSX.Element {
	return (
		<AnchorLink to={props.link}
					className={cx(classes.wrapper_shared, classes.wrapper)} w={props.width}
					visibleFrom={props.visibleFrom}>
			<NavIcon {...props}/>
		</AnchorLink>
	);
}

export function NavIconAction(props: Readonly<NavIconActionProps>): JSX.Element {
	return (
		<Box component={'a'} onClick={props.onClick}
			 className={cx(classes.wrapper_shared, classes.wrapper)} w={props.width}>
			<NavIcon {...props}/>
		</Box>
	);
}
