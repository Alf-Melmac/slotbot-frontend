import {Nav} from "../../../components/Nav";
import {Center, Container, Title} from "@mantine/core";
import {EventCalendarPage} from "./EventCalendarPage";
import {PageFooter} from '../../../components/PageFooter/PageFooter';

type EventsProps = {};

export function Events(props: EventsProps): JSX.Element {
	const {} = props;

	return (
		<Nav>
			<>
				<Container>
					<Center>
						<Title>Events</Title>
					</Center>
					<EventCalendarPage/>
				</Container>

				<PageFooter mt={'xl'}/>
			</>
		</Nav>
	);
}
