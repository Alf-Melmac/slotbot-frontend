import {JSX} from 'react';
import {EventDetailsDto} from '../../eventTypes';
import slotbotServerClient from '../../../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';
import {ActionLogDto, LogAction} from './logTypes';
import {GuildUser} from '../../../guilds/guild/users/GuildUser';
import {Badge, Center, Group, Tooltip} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMinus, faPlus, faPlusMinus} from '@fortawesome/free-solid-svg-icons';
import {T} from '../../../../components/T';

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
		{data?.length === 0 && <Center><T k={'event.details.log.empty'}/></Center>}
		{data?.map((log) => <Group key={log.id}>
			<LogActionBadge action={log.action}/>
			<GuildUser {...log.user}/>
			{log.timeGap}
		</Group>)}
	</>;
}

function LogActionBadge({action}: Readonly<{ action: ActionLogDto['action'] }>): JSX.Element {
	switch (action) {
		case LogAction.SLOT:
			return <Tooltip label={'Slot'}><Badge color={'green'}><FontAwesomeIcon icon={faPlus}/></Badge></Tooltip>;
		case LogAction.UNSLOT:
			return <Tooltip label={'Unslot'}><Badge color={'red'}><FontAwesomeIcon icon={faMinus}/></Badge></Tooltip>;
		case LogAction.SWAP:
			return <Tooltip label={'Swap'}><Badge color={'blue'}><FontAwesomeIcon icon={faPlusMinus}/></Badge></Tooltip>;
		default:
			return <>{action}</>;
	}
}
