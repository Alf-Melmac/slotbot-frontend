import {Fragment, JSX} from 'react';
import {EventDetailsDto} from '../../eventTypes';
import slotbotServerClient from '../../../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';
import {ActionLogDto, LogAction} from './logTypes';
import {GuildUser} from '../../../guilds/guild/users/GuildUser';
import {Badge, Center, Flex, Group, Stack, Text, Tooltip} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMinus, faPlus, faPlusMinus} from '@fortawesome/free-solid-svg-icons';
import {T} from '../../../../components/T';
import dayjs from 'dayjs';
import {Duration} from 'dayjs/plugin/duration';
import utilsClasses from '../../../../utils/styleUtils.module.css';
import cx from 'clsx';
import {DelayedSkeleton} from '../../../../components/Delayed/DelayedSkeleton';

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
		return <Stack gap={'xs'}>
			{[...Array(6)].map((_, i) => <DelayedSkeleton h={28} key={i}/>)}
		</Stack>;
	}

	let eventShown = false;
	return <>
		{data?.length === 0 && <Center><T k={'actionLog.empty'}/></Center>}
		{data?.map((log, index) => {
			const duration = dayjs.duration(log.timeGap);
			const beforeEvent = duration.asSeconds() > 0;
			let showEvent = false;
			if (!eventShown) {
				showEvent = beforeEvent && index > 0;
				eventShown = beforeEvent;
			}

			return <Fragment key={log.id}>
				{showEvent &&
                    <Flex align={'center'}>
                        <hr className={cx(utilsClasses.timelineRuler, utilsClasses.timelineRulerLeft)}/>
                        <Text mx={'sm'} size={'sm'}><T k={'event'}/></Text>
                        <hr className={cx(utilsClasses.timelineRuler, utilsClasses.timelineRulerRight)}/>
                    </Flex>
				}
				<Group>
					<LogActionBadge action={log.action}/>
					<GuildUser {...log.user}/>
					<TimeGap duration={duration} beforeEvent={beforeEvent}/>
				</Group>
			</Fragment>;
		})}
	</>;
}

function LogActionBadge({action}: Readonly<Pick<ActionLogDto, 'action'>>): JSX.Element {
	switch (action) {
		case LogAction.SLOT:
			return <Tooltip label={'Slot'}><Badge color={'green'}><FontAwesomeIcon icon={faPlus}/></Badge></Tooltip>;
		case LogAction.UNSLOT:
			return <Tooltip label={'Unslot'}><Badge color={'red'}><FontAwesomeIcon icon={faMinus}/></Badge></Tooltip>;
		case LogAction.SWAP:
			return <Tooltip label={'Swap'}><Badge color={'blue'}><FontAwesomeIcon
				icon={faPlusMinus}/></Badge></Tooltip>;
		default:
			return <>{action}</>;
	}
}

function TimeGap({duration, beforeEvent}: Readonly<{ duration: Duration, beforeEvent: boolean }>): JSX.Element {
	return <>
		{duration.humanize()} <T k={beforeEvent ? 'actionLog.entry.beforeEvent' : 'actionLog.entry.afterEvent'}/>
	</>;
}
