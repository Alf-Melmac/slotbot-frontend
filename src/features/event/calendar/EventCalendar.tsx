import FullCalendar from '@fullcalendar/react';
import {EventContentArg} from '@fullcalendar/core';
import de from '@fullcalendar/core/locales/de';
import dayGridPlugin from '@fullcalendar/daygrid';
import {Box, ColorSwatch, createStyles, Flex, MediaQuery, rem, Text, Tooltip} from '@mantine/core';
import {showNotification} from '@mantine/notifications';
import {AnchorLink} from '../../../components/Text/AnchorLink';
import {useCheckAccess} from '../../../contexts/authentication/useCheckAccess';
import {ApplicationRoles} from '../../../contexts/authentication/authenticationTypes';
import {AddButton} from '../../../components/Button/AddButton';
import dayjs from 'dayjs';
import slotbotServerClient from '../../../hooks/slotbotServerClient';
import {isGerman} from '../../../contexts/language/Language';
import {hidden} from '../../../contexts/CommonStylings';
import {JSX} from 'react';
import {EventTooltip} from './EventTooltip';
import './eventCalendar.css';

const useStyles = createStyles((theme) => ({
	today: {
		height: 26,
		width: 26,
		backgroundColor: theme.colors.red[8],
		borderRadius: '50%',
		display: 'inline-block',
		fontWeight: 'bold',
		textAlign: 'center',
	},

	eventLink: {
		width: '100%',
	},

	eventWrapper: {
		alignItems: 'center',
		wrap: 'nowrap',
		width: '100%',
		padding: 2,
	},

	eventType: {
		flex: '0 0 auto',
		height: rem(8),
		width: rem(8),
	},

	eventTitle: {
		flex: 1,
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		fontSize: theme.fontSizes.sm,
	},

	eventTime: {
		flex: '0 0 auto',
		fontSize: theme.fontSizes.xs,
	},
}));

type EventCalendarProps = {
	toggleVisible: (isLoading: boolean) => void;
	onFailure: () => void;
};

export function EventCalendar(props: Readonly<EventCalendarProps>): JSX.Element {
	const {toggleVisible, onFailure} = props;
	const {classes} = useStyles();

	const eventContent = (arg: EventContentArg) => {
		const {event, backgroundColor} = arg;

		return (
			<AnchorLink to={`/events/${event.id}`} className={classes.eventLink}>
				<Tooltip label={<EventTooltip eventName={event.title} {...event.extendedProps.shortInformation}/>}>
					<Flex className={classes.eventWrapper}>
						<MediaQuery smallerThan={'sm'} styles={hidden}>
							<ColorSwatch color={backgroundColor} className={classes.eventType} mx={2}/>
						</MediaQuery>
						<Text className={classes.eventTitle}>{event.title}</Text>
						<Text c={'dimmed'} className={classes.eventTime}>{arg.timeText}</Text>
					</Flex>
				</Tooltip>
			</AnchorLink>
		);
	};

	return (
		<>
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
