import FullCalendar from '@fullcalendar/react';
import {EventContentArg} from '@fullcalendar/core';
import de from '@fullcalendar/core/locales/de';
import dayGridPlugin from '@fullcalendar/daygrid';
import {Box, ColorSwatch, createStyles, MediaQuery, Text, Tooltip} from '@mantine/core';
import {showNotification} from '@mantine/notifications';
import {Bold} from '../../../components/Text/Bold';
import {AnchorLink} from '../../../components/Text/AnchorLink';
import {EventTooltip} from './EventTooltip';
import {useCheckAccess} from '../../../contexts/authentication/useCheckAccess';
import {ApplicationRoles} from '../../../contexts/authentication/authenticationTypes';
import {AddButton} from '../../../components/Button/AddButton';
import dayjs from 'dayjs';
import slotbotServerClient from '../../../hooks/slotbotServerClient';
import {isGerman} from '../../../contexts/language/Language';
import {hidden} from '../../../contexts/CommonStylings';
import {JSX} from 'react';

const useStyles = createStyles((theme) => ({
	eventType: {
		height: theme.fontSizes.xs,
		width: theme.fontSizes.xs,
		minWidth: theme.fontSizes.xs,
	},

	eventWrapper: {
		all: 'inherit',
	},

	eventLink: {
		display: 'inherit',
		alignItems: 'inherit',
		textDecoration: 'none !important',
		overflow: 'hidden',
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
					<Box className={classes.eventWrapper}>
						<MediaQuery smallerThan={'xs'} styles={hidden}>
							<ColorSwatch color={backgroundColor} className={classes.eventType} mx={2}/>
						</MediaQuery>
						<Text mx={{base: 2, sm: 0}}>{arg.timeText} <Bold>{event.title}</Bold></Text>
					</Box>
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
