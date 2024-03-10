import {EventFieldDefaultDto, EventTypeDto} from '../../eventTypes';
import slotbotServerClient from '../../../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';
import {replaceBooleanStringWithBoolean, replaceNullWithEmpty} from '../../../../utils/typesHelper';

export function useEventFieldDefaults(eventTypeName: EventTypeDto['name']) {
	const getEventFieldDefaults = () => slotbotServerClient.get('/events/fields', {params: {eventTypeName: eventTypeName}}).then((res) => res.data);
	const query = useQuery<EventFieldDefaultDto[], Error>({
		queryKey: ['field-defaults', eventTypeName],
		queryFn: getEventFieldDefaults,
	});
	const defaultFields = query.data;
	if (defaultFields) {
		defaultFields.forEach(field => {
			replaceNullWithEmpty(field, ['text']);
			if (field.type === 'BOOLEAN') {
				// Force boolean values for checkbox usage
				replaceBooleanStringWithBoolean(field, 'text');
			}
		});
	}

	return {query, defaultFields};
}
