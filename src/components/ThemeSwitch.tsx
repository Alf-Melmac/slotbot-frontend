import {ActionIcon, useMantineColorScheme} from "@mantine/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoon, faSun} from "@fortawesome/free-solid-svg-icons";

type ThemeTogglerProps = {};

export function ThemeSwitch(props: ThemeTogglerProps): JSX.Element {
	const {} = props;
	const {colorScheme, toggleColorScheme} = useMantineColorScheme();
	const dark = colorScheme === 'dark';

	return (
		<ActionIcon
			variant="outline"
			color={dark ? 'yellow' : 'blue'}
			onClick={() => toggleColorScheme()}
			title="Toggle color scheme"
		>
			{dark ? (
				<FontAwesomeIcon icon={faSun} size={"lg"}/>
			) : (
				<FontAwesomeIcon icon={faMoon} size={"lg"}/>
			)}
		</ActionIcon>
	);
}
