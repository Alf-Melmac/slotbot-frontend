import {Nav} from "../../components/Nav";
import {DefaultContainer} from "../../components/DefaultContainer";
import {Center, Title} from "@mantine/core";
import {EventCalendar} from "./EventCalendar";

type EventsProps = {};

export function Events(props: EventsProps): JSX.Element {
	const {} = props;

	return (
		<Nav>
			<DefaultContainer>
				<Center>
					<Title>Events</Title>
				</Center>
				<EventCalendar/>
			</DefaultContainer>
		</Nav>
	);
}
