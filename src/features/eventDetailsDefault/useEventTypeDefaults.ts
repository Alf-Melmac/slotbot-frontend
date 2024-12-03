import {EventTypeDto} from '../event/eventTypes';
import slotbotServerClient from '../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';
import {replaceBooleanStringWithBoolean, replaceNullWithEmpty} from '../../utils/typesHelper';
import {EventDetailDefaultDto} from './eventDetailsDefaultTypes';
import {useGuildContext} from '../../contexts/guildcontext/GuildContext';

export function useEventTypeDefaultsForGuild(eventTypeId: EventTypeDto['id'], guildId: string, transformBooleanValues: boolean = false) {
	const getEventTypeDefaults = () => slotbotServerClient.get(`/events/types/${guildId}/${eventTypeId}/defaults`)
		.then((res) => res.data);
	const query = useQuery<EventDetailDefaultDto[], Error>({
		queryKey: ['field-defaults', eventTypeId],
		queryFn: getEventTypeDefaults,
	});

	const defaultFields = buildDefaultFields(query.data, transformBooleanValues);
	return {query, defaultFields};
}

export function useEventTypeDefaults(eventTypeId: EventTypeDto['id'] | undefined, guildId?: string) {
	if (!eventTypeId) {
		return {defaultFields: undefined};
	}

	if (guildId) {
		return useEventTypeDefaultsForGuild(eventTypeId, guildId, true);
	}

	const {guild} = useGuildContext();
	const getEventTypeDefaults = () => slotbotServerClient.get(`/events/types/guild/${guild}/${eventTypeId}/defaults`)
		.then((res) => res.data);
	const query = useQuery<EventDetailDefaultDto[], Error>({
		queryKey: ['field-defaults-by-identifier', eventTypeId, guild],
		queryFn: getEventTypeDefaults,
	});

	const defaultFields = buildDefaultFields(query.data, true);
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
