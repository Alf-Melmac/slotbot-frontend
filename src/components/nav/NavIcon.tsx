import {Center, createStyles, Text} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {AnchorLink} from '../Text/AnchorLink';

const useStyles = createStyles((theme, width: number) => ({
	wrapper: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 1000,
		paddingLeft: theme.spacing.sm,
		paddingRight: 4,
		width: width,
		height: 36,
		textDecoration: 'none',
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
	},

	icon: {
		height: 28,
		width: 28,
		borderRadius: 28,
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.gray[2] : theme.black,
		color: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
	},
}));

type NavIconProps = {
	link: string;
	text: string;
	icon: IconProp;
	width: number;
};

export function NavIcon(props: NavIconProps): JSX.Element {
	const {classes} = useStyles(props.width);

	return (
		<AnchorLink
			className={classes.wrapper}
			to={props.link}
		>
			<Text size="sm">{props.text}</Text>
			<Center className={classes.icon}>
				<FontAwesomeIcon icon={props.icon}/>
			</Center>
		</AnchorLink>
	);
}
