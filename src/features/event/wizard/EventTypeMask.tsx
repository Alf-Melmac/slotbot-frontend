import {Skeleton} from '@mantine/core';
import slotbotServerClient from '../../../hooks/slotbotServerClient';
import {EventTypeDto} from '../eventTypes';
import {EventTypeInputs} from './EventTypeInputs';
import {EventWizardStepProps} from './EventWizard';
import {useQuery} from '@tanstack/react-query';

export function EventTypeMask(props: EventWizardStepProps): JSX.Element {
	const getEventTypes = () => slotbotServerClient.get(`http://localhost:8090/events/types`).then((res) => res.data);
	const query = useQuery<Array<EventTypeDto>, Error>(['eventTypes'], getEventTypes);

	return (
		<>
			{query.isLoading ?
				<Skeleton mt={'xs'} width={'100%'} height={60}/>
				:
				<EventTypeInputs query={query} useFormReturn={props.form}/>
			}
		</>
	);
}
