import {EventFieldDefaultDto, EventTypeDto} from '../../eventTypes';
import slotbotServerClient from '../../../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';
import {replaceNullWithEmpty} from '../../../../utils/typesHelper';

export function useEventFieldDefaults(eventTypeName: EventTypeDto['name']) {
	const getEventFieldDefaults = () => slotbotServerClient.get(`/events/fields/${eventTypeName}`).then((res) => res.data);
	const query = useQuery<EventFieldDefaultDto[], Error>(['field-defaults', eventTypeName], getEventFieldDefaults);
	const defaultFields = query.data;
	if (defaultFields) {
		defaultFields.forEach(field => replaceNullWithEmpty(field, ['text']));
	}

	return {query, defaultFields};
}
