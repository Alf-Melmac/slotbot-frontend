import slotbotServerClient from '../../../../hooks/slotbotServerClient';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {EventTypeRequirementListDto} from '../../../guilds/guild/config/requirement/requirementTypes';
import {useGuildContext} from '../../../../contexts/guildcontext/GuildContext';
import {useEventAction} from '../../../../contexts/event/action/EventActionContext';

function useGetEventTypeRequirementsForGuild(eventTypeId: number | undefined, guildId: string) {
	const getRequirementListsActive = () => slotbotServerClient.get(`/requirement-list/${guildId}/event-type/${eventTypeId}/active`)
		.then((res) => res.data);
	return useQuery<EventTypeRequirementListDto[], Error>({
		queryKey: ['eventTypeRequirementListsActive-by-identifier', guildId, eventTypeId],
		queryFn: getRequirementListsActive,
		enabled: !!eventTypeId,
	});
}

export function useGetEventTypeRequirements(eventTypeId: number | undefined): Partial<UseQueryResult<EventTypeRequirementListDto[], Error>> {
	//To allow eventType to switch between undefined and a number this is strangely implemented (rule of hooks)
	const {ownerGuild} = useEventAction();
	const forGuild = ownerGuild ? useGetEventTypeRequirementsForGuild(eventTypeId, ownerGuild) : null;

	if (!eventTypeId) {
		return {data: [], isLoading: false};
	}

	if (ownerGuild) {
		return forGuild!; //Same if statement as for the variable therefore never null
	}

	const {guild} = useGuildContext();
	const getRequirementListsActive = () => slotbotServerClient.get(`/requirement-list/guild/${guild}/event-type/${eventTypeId}/active`)
		.then((res) => res.data);
	return useQuery<EventTypeRequirementListDto[], Error>({
		queryKey: ['eventTypeRequirementListsActive', guild, eventTypeId],
		queryFn: getRequirementListsActive,
	});
}
