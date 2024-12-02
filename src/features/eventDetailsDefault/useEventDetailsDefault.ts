import {EventTypeDto} from '../event/eventTypes';
import slotbotServerClient from '../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';
import {replaceBooleanStringWithBoolean, replaceNullWithEmpty} from '../../utils/typesHelper';
import {EventDetailDefaultDto} from './eventDetailsDefaultTypes';
import {useGuildContext} from '../../contexts/guildcontext/GuildContext';

export function useEventTypesDefault(eventTypeId: EventTypeDto['id'], guildId: string) {
	const getEventTypeDefaults = () => slotbotServerClient.get(`/events/types/${guildId}/${eventTypeId}/defaults`)
		.then((res) => res.data);
	const query = useQuery<EventDetailDefaultDto[], Error>({
		queryKey: ['field-defaults', eventTypeId],
		queryFn: getEventTypeDefaults,
	});

	const defaultFields = buildDefaultFields(query.data, false);
	return {query, defaultFields};
}

export function useEventDetailsDefault(eventTypeName: EventTypeDto['name'], transformBooleanValues: boolean, guildId?: string) {
	const {guild} = useGuildContext();
	let url;
	if (guildId) {
		url = `/events/details/defaults/${guildId}`;
	} else {
		const guildIdentifierUrl = guild ? `/guild/${guild}` : '';
		url = `/events/details/defaults${guildIdentifierUrl}`;
	}

	const getEventFieldDefaults = () => slotbotServerClient.get(url, {params: {eventTypeName: eventTypeName}})
		.then((res) => res.data);
	const query = useQuery<EventDetailDefaultDto[], Error>({
		queryKey: ['field-defaults', eventTypeName, guildId],
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
