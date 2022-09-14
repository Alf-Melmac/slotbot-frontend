import {Skeleton} from '@mantine/core';
import slotbotServerClient from '../../../../hooks/slotbotServerClient';
import {EventTypeDto} from '../../eventTypes';
import {EventTypeInputs} from './EventTypeInputs';
import {useQuery} from '@tanstack/react-query';
import {EventAction, EventActionPageProps} from '../EventActionPage';

export function EventTypeMask<FormReturnType extends EventAction>(props: EventActionPageProps<FormReturnType>): JSX.Element {
	const getEventTypes = () => slotbotServerClient.get(`http://localhost:8090/events/types`).then((res) => res.data);
	const query = useQuery<Array<EventTypeDto>, Error>(['eventTypes'], getEventTypes);

	return <>
		{query.isLoading ?
			<Skeleton mt={'xs'} width={'100%'} height={60}/>
			:
			<EventTypeInputs {...props} query={query}/>
		}
	</>;
}
