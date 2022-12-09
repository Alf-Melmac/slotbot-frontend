import {ActionIcon, createStyles, Menu, useMantineColorScheme} from "@mantine/core";
import {FontAwesomeIcon, FontAwesomeIconProps} from "@fortawesome/react-fontawesome";
import {faMoon, faSun} from "@fortawesome/free-solid-svg-icons";
import {T} from './T';

export function ThemeSwitch(): JSX.Element {
	const {colorScheme, toggleColorScheme} = useMantineColorScheme();
	const dark = colorScheme === 'dark';

	return (
		<ActionIcon
			variant={'outline'}
			color={dark ? 'yellow' : 'blue'}
			onClick={() => toggleColorScheme()}
		>
			{dark ? (
				<LightThemeIcon size={'lg'}/>
			) : (
				<DarkThemeIcon size={'lg'}/>
			)}
		</ActionIcon>
	);
}

export function ThemeSwitchAsMenuItem(): JSX.Element {
	const {colorScheme, toggleColorScheme} = useMantineColorScheme();
	const dark = colorScheme === 'dark';

	return (
		<Menu.Item icon={dark ? <LightThemeIcon/> : <DarkThemeIcon/>} onClick={() => toggleColorScheme()}>
			<T k={dark ? 'theme.toggle.light' : 'theme.toggle.dark'}/>
		</Menu.Item>
	);
}

const useStyles = createStyles((theme) => ({
	light: {
		color: theme.colors.yellow[5],
	},

	dark: {
		color: theme.colors.blue[6],
	},
}));

function LightThemeIcon(props: Omit<FontAwesomeIconProps, 'icon' | 'color'>): JSX.Element {
	const {classes} = useStyles();
	return <FontAwesomeIcon icon={faSun} className={classes.light} {...props}/>;
}

function DarkThemeIcon(props: Omit<FontAwesomeIconProps, 'icon' | 'color'>): JSX.Element {
	const {classes} = useStyles();
	return <FontAwesomeIcon icon={faMoon} className={classes.dark} {...props}/>;
}
