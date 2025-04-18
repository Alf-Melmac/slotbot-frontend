import {EventActionPageTitle} from '../EventActionPageTitle';
import {EventDetails} from './EventDetails';
import {Button, Group} from '@mantine/core';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {useEventTypeDefaults} from '../../../eventDetailsDefault/useEventTypeDefaults';
import {EventFieldDefaultsProvider} from '../../../../contexts/event/EventFieldDefaultsContext';
import {randomId} from '@mantine/hooks';
import {T} from '../../../../components/T';
import {JSX} from 'react';

export function EventDetailsPage(): JSX.Element {
	const form = useFormContext();

	const {defaultFields} = useEventTypeDefaults(form.values.eventType.id);

	return <EventFieldDefaultsProvider fieldDefaults={defaultFields}>
		<Group justify={'space-between'}>
			<EventActionPageTitle title={'details'}/>
			{defaultFields?.length &&
                <Button variant={'light'} mb={'xs'} onClick={() => {
					defaultFields.forEach(field => {
						form.insertListItem('details', {title: field.title, text: field.text, id: randomId()});
					});
				}
				}><T k={'event.details.add.default'} args={[form.values.eventType.name]}/></Button>}
		</Group>

		<EventDetails/>
	</EventFieldDefaultsProvider>;
}
