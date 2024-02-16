import {ActionIcon, Menu, useMantineColorScheme} from '@mantine/core';
import {FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome';
import {faMoon, faSun} from '@fortawesome/free-solid-svg-icons';
import {T} from './T';
import {JSX} from 'react';
import classes from './ThemeSwitch.module.css';

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
		<Menu.Item leftSection={dark ? <LightThemeIcon/> : <DarkThemeIcon/>} onClick={() => toggleColorScheme()}>
			<T k={dark ? 'theme.toggle.light' : 'theme.toggle.dark'}/>
		</Menu.Item>
	);
}

function LightThemeIcon(props: Readonly<Omit<FontAwesomeIconProps, 'icon' | 'color'>>): JSX.Element {
	return <FontAwesomeIcon icon={faSun} className={classes.light} {...props}/>;
}

function DarkThemeIcon(props: Readonly<Omit<FontAwesomeIconProps, 'icon' | 'color'>>): JSX.Element {
	return <FontAwesomeIcon icon={faMoon} className={classes.dark} {...props}/>;
}
