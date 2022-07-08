import {Skeleton} from '@mantine/core';
import slotbotServerClient from '../../../hooks/slotbotServerClient';
import {useQuery} from 'react-query';
import {EventPostDto, EventTypeDto} from '../eventTypes';
import {EventTypeInputs} from './EventTypeInputs';
import {UseFormReturnType} from '@mantine/form';

type EventTypeProps = {
	useFormReturn: UseFormReturnType<EventPostDto>
};

export function EventTypeMask(props: EventTypeProps): JSX.Element {
	const getEventTypes = () => slotbotServerClient.get(`http://localhost:8090/events/types`).then((res) => res.data);
	const query = useQuery<Array<EventTypeDto>, Error>('eventTypes', getEventTypes);

	return (
		<>
			{query.isLoading ?
				<Skeleton mt={'xs'} width={'100%'} height={60}/>
			:
				<EventTypeInputs query={query} useFormReturn={props.useFormReturn}/>
			}
		</>
	);
}
