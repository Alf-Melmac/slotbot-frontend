import {Nav} from "../../components/Nav";
import {Center, Container, Title} from "@mantine/core";
import {EventCalendarPage} from "./EventCalendarPage";

type EventsProps = {};

export function Events(props: EventsProps): JSX.Element {
	const {} = props;

	return (
		<Nav>
			<Container>
				<Center>
					<Title>Events</Title>
				</Center>
				<EventCalendarPage/>
			</Container>
		</Nav>
	);
}
