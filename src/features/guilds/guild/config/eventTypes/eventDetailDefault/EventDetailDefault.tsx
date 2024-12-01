import {JSX} from 'react';
import {EventTypeDto} from '../../../../../event/eventTypes';
import {useEventDetailsDefault} from '../../../../../eventDetailsDefault/useEventDetailsDefault';
import {Skeleton} from '@mantine/core';
import {EventDetailDefaultForm} from './EventDetailDefaultForm';
import {useGuildPage} from '../../../../../../contexts/guild/GuildPageContext';

export type EventDetailDefaultProps = {
	name: EventTypeDto['name'];
	onSuccess: () => void;
};

export function EventDetailDefault(props: Readonly<EventDetailDefaultProps>): JSX.Element {
	const {name, onSuccess} = props;

	const {guildId} = useGuildPage();
	const {query, defaultFields} = useEventDetailsDefault(name, false, guildId);
	if (query.isLoading) return <Skeleton height={90}/>;

	return <EventDetailDefaultForm defaultFields={defaultFields} name={name} onSuccess={onSuccess}/>;
}
