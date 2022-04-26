import {useParams} from 'react-router';
import {Nav} from '../../../components/Nav';
import {Container, Title} from '@mantine/core';

type EventDetailsProps = {
	eventId: string,
};

export function EventDetails(): JSX.Element {
	const {eventId} = useParams<EventDetailsProps>();

	return (
		<Nav>
			<>
				<Container>
					<Title>{eventId}</Title>
				</Container>
			</>
		</Nav>
	);
}
