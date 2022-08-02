import {Center, createStyles, Text} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {AnchorLink} from '../Text/AnchorLink';

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
	},

	icon: {
		height: NAV_ICON_SIZE,
		width: NAV_ICON_SIZE,
		borderRadius: NAV_ICON_SIZE,
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.gray[2] : theme.colors.dark[4],
		color: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
	},
}));

type NavIconProps = {
	link: string;
	text: string;
	icon: IconProp;
	width: number;
	externalLink?: boolean;
};

export function NavIcon(props: NavIconProps): JSX.Element {
	const {classes} = useStyles(props.width);

	return (
		<AnchorLink
			className={classes.wrapper}
			to={props.link}
			externalLink={props.externalLink}
		>
			<Text size="sm">{props.text}</Text>
			<Center className={classes.icon}>
				<FontAwesomeIcon icon={props.icon}/>
			</Center>
		</AnchorLink>
	);
}
