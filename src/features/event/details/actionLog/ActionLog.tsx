import {JSX} from 'react';
import {EventDetailsDto} from '../../eventTypes';
import slotbotServerClient from '../../../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';
import {ActionLogDto, LogAction} from './logTypes';
import {GuildUser} from '../../../guilds/guild/users/GuildUser';
import {Badge, Group} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMinus, faPlus, faPlusMinus} from '@fortawesome/free-solid-svg-icons';

type ActionLogProps = {
	eventId: EventDetailsDto['id'];
};

export function ActionLog({eventId}: Readonly<ActionLogProps>): JSX.Element {
	const getEventLogs = () => slotbotServerClient.get(`/action-logs/events/${eventId}`).then(res => res.data);
	const {data, isLoading} = useQuery<ActionLogDto[], Error>({
		queryKey: ['action-logs', eventId],
		queryFn: getEventLogs,
	});

	if (isLoading) {
		return <>Loading...</>;
	}

	return <>
		{data?.map((log) => <Group key={log.id}>
			<LogActionBadge action={log.action}/>
			<GuildUser {...log.user}/>
			{log.timeGap}
		</Group>)}
	</>
}

function LogActionBadge({action}: Readonly<{action: ActionLogDto['action']}>): JSX.Element {
	switch (action) {
		case LogAction.SLOT:
			return <Badge color={'green'}><FontAwesomeIcon icon={faPlus}/></Badge>;
		case LogAction.UNSLOT:
			return <Badge color={'red'}><FontAwesomeIcon icon={faMinus}/></Badge>;
		case LogAction.SWAP:
			return <Badge color={'blue'}><FontAwesomeIcon icon={faPlusMinus}/></Badge>;
		default:
			return <>{action}</>;
	}
}
