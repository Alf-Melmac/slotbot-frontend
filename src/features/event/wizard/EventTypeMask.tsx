import {Skeleton} from '@mantine/core';
import slotbotServerClient from '../../../hooks/slotbotServerClient';
import {useQuery} from 'react-query';
import {EventTypeDto} from '../eventTypes';
import {EventTypeInputs} from './EventTypeInputs';

type EventTypeProps = {};

export function EventTypeMask(props: EventTypeProps): JSX.Element {
	const {} = props;

	const getEventTypes = () => slotbotServerClient.get(`http://localhost:8090/events/types`).then((res) => res.data);
	const query = useQuery<Array<EventTypeDto>, Error>('eventTypes', getEventTypes);

	return (
		<>
			{query.isLoading ?
				<Skeleton mt={'xs'} width={'100%'} height={60}/>
			:
				<EventTypeInputs query={query}/>
			}
		</>
	);
}
