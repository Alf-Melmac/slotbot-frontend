import {Button, Card, Container, Text, Title} from "@mantine/core";
import {Link} from "react-router-dom";
import {Nav} from "../components/Nav";

type StartPageProps = {};

export function StartPage(props: StartPageProps): JSX.Element {
	const {} = props;

	return (
		<Nav>
			<Container>
				<Card>
					<Title order={1}>AMB</Title>
					<Text><Link to="/events">Events</Link></Text>
				</Card>
				<Button>Ocean blue button</Button>
			</Container>
		</Nav>
	);
}
