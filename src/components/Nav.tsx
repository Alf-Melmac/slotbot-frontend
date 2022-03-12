import {AppShell, Box, Container, Group, Header, Image, Text} from "@mantine/core";
import {useViewportSize} from "@mantine/hooks";
import {ThemeSwitch} from "./ThemeSwitch";

type NavProps = {
	children: JSX.Element
};

export function Nav(props: NavProps): JSX.Element {
	const {height} = useViewportSize();

	return (
		<AppShell
			header={
				<Header height={100} p="xs">
					<Container sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
						<Group noWrap>
							<Image width={80} src="https://armamachtbock.de/assets/img/amb-logo.jpg"
								   withPlaceholder/>
							<Text
								variant="gradient"
								gradient={{from: "indigo", to: "cyan", deg: 45}}
								weight="bold"
								size="xl">
								Arma macht Bock
							</Text>
						</Group>
						<Box styles={{alignSelf: "flex-end"}}>
							<ThemeSwitch/>
						</Box>
					</Container>
				</Header>
			}
			padding="md"
			styles={(theme) => ({
				main: {
					backgroundColor:
						theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
				},
			})}>
			<Box sx={{minHeight: height - 132}}>{props.children}</Box>
		</AppShell>
	);
}
