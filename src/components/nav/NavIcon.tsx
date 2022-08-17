import {Box, Center, createStyles, DefaultProps, Text} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {AnchorLink} from '../Text/AnchorLink';
import {underlineOnHover} from '../../contexts/CommonStylings';

export const NAV_ICON_WRAPPER_HEIGHT = 36;
export const NAV_ICON_SIZE = 28;
const useStyles = createStyles((theme, width: number) => ({
	wrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 1000,
		paddingLeft: theme.spacing.sm,
		paddingRight: 4,
		width: width,
		flexShrink: 0,
		height: NAV_ICON_WRAPPER_HEIGHT,
		textDecoration: 'none',
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,

		...underlineOnHover,
	},

	icon: {
		height: NAV_ICON_SIZE,
		width: NAV_ICON_SIZE,
		borderRadius: NAV_ICON_SIZE,
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.gray[2] : theme.colors.dark[4],
		color: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
	},
}));

interface NavIconProps {
	text: string;
	icon: IconProp;
	width: number;
	className?: DefaultProps['className'];
}

interface NavIconLinkProps extends NavIconProps {
	link: string;
}

interface NavIconActionProps extends NavIconProps {
	onClick?: () => void;
}

function NavIcon(props: NavIconProps): JSX.Element {
	const {classes} = useStyles(props.width);

	return (
		<Box className={props.className}>
			<Text size="sm">{props.text}</Text>
			<Center className={classes.icon}>
				<FontAwesomeIcon icon={props.icon}/>
			</Center>
		</Box>
	);
}

export function NavIconLink(props: NavIconLinkProps): JSX.Element {
	const {classes, cx} = useStyles(props.width);

	return (
		<AnchorLink className={cx(classes.wrapper, props.className)} to={props.link}>
			<NavIcon {...props}/>
		</AnchorLink>
	);
}

export function NavIconAction(props: NavIconActionProps): JSX.Element {
	const {classes} = useStyles(props.width);

	return (
		<Box component={'a'} className={classes.wrapper} onClick={props.onClick}>
			<NavIcon {...props}/>
		</Box>
	);
}
