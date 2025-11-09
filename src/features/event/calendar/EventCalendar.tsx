import FullCalendar from '@fullcalendar/react';
import {DayCellContentArg, EventContentArg} from '@fullcalendar/core';
import de from '@fullcalendar/core/locales/de';
import dayGridPlugin from '@fullcalendar/daygrid';
import {Box, ColorSwatch, Flex, Text, Tooltip} from '@mantine/core';
import {showNotification} from '@mantine/notifications';
import {AnchorLink} from '../../../components/Text/AnchorLink';
import dayjs from 'dayjs';
import slotbotServerClient from '../../../hooks/slotbotServerClient';
import {useIsGerman} from '../../../contexts/language/Language';
import {JSX, useEffect, useRef} from 'react';
import {EventTooltip} from './EventTooltip';
import './eventCalendar.css';
import classes from './EventCalendar.module.css';
import utilsClasses from '../../../utils/styleUtils.module.css';
import cx from 'clsx';
import {useGuildContext} from '../../../contexts/guildcontext/GuildContext';
import {EventCalendarMobile} from './mobile/EventCalendarMobile';
import {CalendarEventDto} from '../eventTypes';
import {useIsMobile} from '../../../hooks/isMobile';

export type FullCalendarEventType = {
	id: EventContentArg['event']['id'];
	title: EventContentArg['event']['title'];
	extendedProps: Omit<CalendarEventDto, 'id' | 'title' | 'start'>;
};

type EventCalendarProps = {
	toggleVisible: (isLoading: boolean) => void;
	onFailure: () => void;
};

export function EventCalendar(props: Readonly<EventCalendarProps>): JSX.Element {
	const {toggleVisible, onFailure} = props;
	const {guildUrlPath} = useGuildContext();
	const isMobile = useIsMobile();
	const calendarRef = useRef(null);
	useEffect(() => {
		const calendar = calendarRef?.current as unknown as FullCalendar | null;
		if (calendar) {
			// Timeout to let the view change happen after the current render cycle, to avoid a flushSync error
			setTimeout(() => {
				calendar.getApi().changeView(isMobile ? 'custom' : 'dayGridMonth');
			}, 0);
		}
	}, [isMobile]);

	const eventContent = (arg: EventContentArg) => {
		const {event, timeText} = arg;
		const {id, title, extendedProps} = event as unknown as FullCalendarEventType;

		return (
			<AnchorLink to={`/events/${id}`} className={classes.eventLink}>
				<Tooltip label={<EventTooltip title={title} {...extendedProps}/>}>
					<Flex className={classes.eventWrapper}>
						<ColorSwatch visibleFrom={'xs'} color={extendedProps.eventType.color} size={8}
									 className={classes.eventType}
									 mx={2}/>
						<Text className={cx(classes.eventTitle, utilsClasses.ellipsis)}>{event.title}</Text>
						<Text c={'dimmed'} className={classes.eventTime}>{timeText}</Text>
					</Flex>
				</Tooltip>
			</AnchorLink>
		);
	};

	return <FullCalendar
		ref={calendarRef}
		plugins={[dayGridPlugin, EventCalendarMobile]}
		initialView={isMobile ? 'custom' : 'dayGridMonth'}
		locale={useIsGerman() ? de : undefined}
		dayCellContent={DayCellContent}
		events={(info, successCallback, failureCallback) => {
			const start = dayjs(info.start.valueOf()).format();
			const end = dayjs(info.end.valueOf()).format();
			slotbotServerClient.get(`/events/calendar${guildUrlPath}`, {params: {start, end}})
				.then((res) => {
					const data = res.data;
					for (const event of data) {
						event.start = `${event.start}Z`;
					}
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
	/>;
}

function DayCellContent(props: DayCellContentArg): JSX.Element | string {
	const {isToday, dayNumberText} = props;
	return isToday ? <Box className={classes.today}>{dayNumberText}</Box> : dayNumberText;
}
