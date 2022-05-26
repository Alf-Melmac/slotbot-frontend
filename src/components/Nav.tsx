import {AppShell, Box, Container, createStyles, Header} from "@mantine/core";
import {useViewportSize} from "@mantine/hooks";
import {ThemeSwitch} from "./ThemeSwitch";
import {AmbLogo} from './logo/AmbLogo';

type NavProps = {
	children: JSX.Element
};

export const NAV_HEIGHT = 100;

const useStyles = createStyles((theme) => ({
	outer: {
		borderBottom: 0,
		backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[1],
	},

	inner: {
		height: NAV_HEIGHT,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
}));

export function Nav(props: NavProps): JSX.Element {
	const {classes} = useStyles();

	const {height} = useViewportSize();

	return (
		<AppShell
			header={
				<Header height={NAV_HEIGHT} className={classes.outer}>
					<Container className={classes.inner}>
						<AmbLogo/>
						<Box styles={{alignSelf: "flex-end"}}>
							<ThemeSwitch/>
						</Box>
					</Container>
				</Header>
			}
			padding={0}
			styles={(theme) => ({
				main: {
					backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[1],
				},
			})}>
			<Box sx={{minHeight: height - 132}}>{props.children}</Box>
		</AppShell>
	);
}
