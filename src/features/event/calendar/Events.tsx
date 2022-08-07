import {Nav} from "../../../components/nav/Nav";
import {Center, Container, Title} from "@mantine/core";
import {EventCalendarPage} from "./EventCalendarPage";
import {PageFooter} from '../../../components/PageFooter/PageFooter';

export function Events(): JSX.Element {
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
