import FullCalendar from '@fullcalendar/react';
import {EventContentArg} from '@fullcalendar/core';
import de from '@fullcalendar/core/locales/de';
import dayGridPlugin from '@fullcalendar/daygrid';
import {Box, ColorSwatch, Flex, Text, Tooltip} from '@mantine/core';
import {showNotification} from '@mantine/notifications';
import {AnchorLink} from '../../../components/Text/AnchorLink';
import {useCheckAccess} from '../../../contexts/authentication/useCheckAccess';
import {ApplicationRoles} from '../../../contexts/authentication/authenticationTypes';
import {AddButton} from '../../../components/Button/AddButton';
import dayjs from 'dayjs';
import slotbotServerClient from '../../../hooks/slotbotServerClient';
import {isGerman} from '../../../contexts/language/Language';
import {JSX, lazy, Suspense} from 'react';
import {EventTooltip} from './EventTooltip';
import './eventCalendar.css';
import {getGuild, Guild} from '../../../contexts/theme/Theme';
import classes from './EventCalendar.module.css';

type EventCalendarProps = {
	toggleVisible: (isLoading: boolean) => void;
	onFailure: () => void;
};

export function EventCalendar(props: Readonly<EventCalendarProps>): JSX.Element {
	const {toggleVisible, onFailure} = props;
	const TTTTheme = lazy(() => import('./ttt/EventCalendarTTTTheme'));

	const eventContent = (arg: EventContentArg) => {
		const {event, backgroundColor} = arg;

		return (
			<AnchorLink to={`/events/${event.id}`} className={classes.eventLink}>
				<Tooltip label={<EventTooltip eventName={event.title} {...event.extendedProps.shortInformation}/>}>
					<Flex className={classes.eventWrapper}>
						<ColorSwatch visibleFrom={'xs'} color={backgroundColor} className={classes.eventType} mx={2}/>
						<Text className={classes.eventTitle}>{event.title}</Text>
						<Text c={'dimmed'} className={classes.eventTime}>{arg.timeText}</Text>
					</Flex>
				</Tooltip>
			</AnchorLink>
		);
	};

	return (
		<>
			<Suspense fallback={<></>}>
				{getGuild() === Guild.TTT && <TTTTheme/>}
			</Suspense>
			{useCheckAccess(ApplicationRoles.ROLE_EVENT_MANAGE) &&
                <AddButton label={'event.add'} to={'new'} mb={'sm'}/>
			}
			<FullCalendar
				plugins={[dayGridPlugin]}
				initialView="dayGridMonth"
				locale={isGerman() ? de : undefined}
				viewDidMount={(_arg) => toggleVisible(true)}
				dayCellContent={(arg) =>
					arg.isToday ? <Box className={classes.today}>{arg.dayNumberText}</Box> : arg.dayNumberText
				}
				events={(info, successCallback, failureCallback) => {
					const start = dayjs(info.start.valueOf()).format();
					const end = dayjs(info.end.valueOf()).format();
					slotbotServerClient.get('events/list', {params: {start, end}})
						.then((res) => {
							const data = res.data;
							data.forEach((event: any) => {
								event.start = `${event.start}Z`;
							});
							successCallback(data);
						})
						.catch(failureCallback);
				}}
				eventTimeFormat={{
					hour: '2-digit',
					minute: '2-digit',
				}}
				nextDayThreshold={'01:00:00'}
				eventContent={eventContent}
				eventSourceSuccess={(_content, _response) => toggleVisible(false)}
				eventSourceFailure={(error) => {
					showNotification({
						title: 'Oops',
						message: error.message,
						color: 'red',
						autoClose: false,
					});
					onFailure();
				}}
			/>
		</>
	);
}
