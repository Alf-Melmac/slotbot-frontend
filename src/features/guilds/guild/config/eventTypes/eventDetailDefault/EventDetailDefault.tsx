import {JSX} from 'react';
import {EventTypeDto} from '../../../../../event/eventTypes';
import {useEventTypeDefaultsForGuild} from '../../../../../eventDetailsDefault/useEventTypeDefaults';
import {Skeleton} from '@mantine/core';
import {EventDetailDefaultForm} from './EventDetailDefaultForm';
import {useGuildPage} from '../../../../../../contexts/guild/GuildPageContext';
import {EventDetailDefaultPostDto} from '../../../../../eventDetailsDefault/eventDetailsDefaultTypes';

export type EventDetailDefaultProps = Pick<EventTypeDto, 'id'> & {
	onSuccess: () => void;
};

export function EventDetailDefault(props: Readonly<EventDetailDefaultProps>): JSX.Element {
	const {id} = props;

	const {guildId} = useGuildPage();
	const {query, defaultFields} = useEventTypeDefaultsForGuild(id, guildId);
	if (query.isLoading) return <Skeleton height={90}/>;

	return <EventDetailDefaultForm defaultFields={defaultFields as unknown as EventDetailDefaultPostDto[]} {...props}/>;
}
