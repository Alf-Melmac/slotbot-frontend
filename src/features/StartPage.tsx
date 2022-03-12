import {Button, Card, Container, Text, Title, useMantineColorScheme} from "@mantine/core";
import {Link} from "react-router-dom";

type StartPageProps = {};

export function StartPage(props: StartPageProps): JSX.Element {
	const {} = props;
	const {colorScheme} = useMantineColorScheme();
	const dark = colorScheme === 'dark';

	return (
		<>
			<header id="header" style={{
				position: "relative",
				backgroundImage: dark ? 'url(https://cdn.discordapp.com/attachments/819969938562220053/934212345784303666/20220121221305_1.jpg)' : 'url(https://cdn.discordapp.com/attachments/819969938562220053/934588485648646214/ArmA_3_Screenshot_2022.01.23_-_00.16.14.22.png)',
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				backgroundAttachment: "scroll",
				backgroundSize: "cover"
			}}>
				<Container size={"xl"}>
					<div style={{
						margin: 0,
						minWidth: 0,
						display: "flex",
						alignItems: "center",
						minHeight: "100vh"
					}}>
						<Card p={"xl"} withBorder shadow={"xl"}
							  style={{
								  maxWidth: 650,
								  margin: 0,
								  backgroundColor: dark ? "rgba(37,38,43,0.5)" : "rgba(255,255,255,0.85)"
							  }}>
							<Title order={1} style={{fontSize: "48px"}}>Willkommen bei AMB</Title>
							<Text style={{marginTop: "30px", lineHeight: 2.48}}>
								Dein nächster Schritt in Richtung Zeitvertreib und Gemeinschaft
							</Text>
							<Button color={"blue"} fullWidth size={"xl"} style={{marginTop: "24px"}}
									component={Link} to="/events">
								Events
							</Button>
						</Card>
					</div>
				</Container>
			</header>

			<Text>Hello</Text>
		</>
	);
}
