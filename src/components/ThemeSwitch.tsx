import {ActionIcon, createStyles, Menu, useMantineColorScheme} from "@mantine/core";
import {FontAwesomeIcon, FontAwesomeIconProps} from "@fortawesome/react-fontawesome";
import {faMoon, faSun} from "@fortawesome/free-solid-svg-icons";

export function ThemeSwitch(): JSX.Element {
	const {colorScheme, toggleColorScheme} = useMantineColorScheme();
	const dark = colorScheme === 'dark';

	return (
		<ActionIcon
			variant={'outline'}
			color={dark ? 'yellow' : 'blue'}
			onClick={() => toggleColorScheme()}
			title="Toggle color scheme"
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

	return <Menu.Item icon={dark ? <LightThemeIcon/> : <DarkThemeIcon/>}
					  onClick={() => toggleColorScheme()}>
		{dark ? 'Licht an' : 'Licht aus'}
	</Menu.Item>
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
