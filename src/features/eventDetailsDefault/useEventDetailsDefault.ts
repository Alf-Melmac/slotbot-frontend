import {EventTypeDto} from '../event/eventTypes';
import slotbotServerClient from '../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';
import {replaceBooleanStringWithBoolean, replaceNullWithEmpty} from '../../utils/typesHelper';
import {EventDetailDefaultDto} from './eventDetailsDefaultTypes';
import {useGuildContext} from '../../contexts/guildcontext/GuildContext';

export function useEventDetailsDefault(eventTypeName: EventTypeDto['name'], transformBooleanValues: boolean) {
	const {guildUrlPath} = useGuildContext();
	const getEventFieldDefaults = () => slotbotServerClient.get(`/events/details/defaults${guildUrlPath}`, {params: {eventTypeName: eventTypeName}})
		.then((res) => res.data);
	const query = useQuery<EventDetailDefaultDto[], Error>({
		queryKey: ['field-defaults', eventTypeName],
		queryFn: getEventFieldDefaults,
	});

	const defaultFields = buildDefaultFields(query.data, transformBooleanValues);
	return {query, defaultFields};
}

function buildDefaultFields(queryData: EventDetailDefaultDto[] | undefined, transformBooleanValues: boolean): EventDetailDefaultDto[] | undefined {
	const defaultFields = queryData;
	if (defaultFields) {
		defaultFields.forEach(field => {
			replaceNullWithEmpty(field, ['text']);
			if (transformBooleanValues && field.type === 'BOOLEAN') {
				// Force boolean values for checkbox usage
				replaceBooleanStringWithBoolean(field, 'text');
			}
		});
	}
	return defaultFields;
}
