import {EventActionPageTitle} from '../EventActionPage';
import {EventDetails} from './EventDetails';
import {Button, Group} from '@mantine/core';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {useEventFieldDefaults} from './useEventFieldDefaults';
import {EventFieldDefaultsProvider} from '../../../../contexts/event/EventFieldDefaultsContext';
import {randomId} from '@mantine/hooks';

export function EventDetailsPage(): JSX.Element {
	const form = useFormContext();

	const {defaultFields} = useEventFieldDefaults(form.values.eventType.name);

	return <EventFieldDefaultsProvider fieldDefaults={defaultFields}>
		<Group position={'apart'}>
			<EventActionPageTitle>Details</EventActionPageTitle>
			{defaultFields?.length &&
                <Button variant={'light'} mb={'xs'} onClick={() => {
					defaultFields.forEach(field => {
						form.insertListItem('details', {title: field.title, text: field.text, id: randomId()});
					});
				}
				}>{`Standard "${form.values.eventType.name}" Details hinzufügen`}</Button>}
		</Group>

		<EventDetails/>
	</EventFieldDefaultsProvider>;
}
