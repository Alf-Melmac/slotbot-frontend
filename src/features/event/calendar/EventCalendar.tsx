import FullCalendar, {EventContentArg} from '@fullcalendar/react';
import de from '@fullcalendar/core/locales/de';
import dayGridPlugin from '@fullcalendar/daygrid';
import {Box, ColorSwatch, createStyles, Text, Tooltip} from '@mantine/core';
import {showNotification} from '@mantine/notifications';
import {Bold} from '../../../components/Text/Bold';
import {AnchorLink} from '../../../components/Text/AnchorLink';
import {EventTooltip} from './EventTooltip';

const useStyles = createStyles((theme) => ({
	eventType: {
		minWidth: 11,
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

export function EventCalendar(props: EventCalendarProps): JSX.Element {
	const {toggleVisible, onFailure} = props;
	const {classes} = useStyles();

	const eventContent = (arg: EventContentArg) => {
		const {event, backgroundColor} = arg;

		return (
			<AnchorLink to={`/events/${event.id}`} className={classes.eventLink}>
				<Tooltip label={<EventTooltip eventName={event.title} {...event.extendedProps.shortInformation}/>}>
					<Box className={classes.eventWrapper}>
						<ColorSwatch color={backgroundColor} className={classes.eventType} size={11} mx={2}/>
						<Text>{arg.timeText} <Bold>{event.title}</Bold></Text>
					</Box>
				</Tooltip>
			</AnchorLink>
		);
	};

	return (
		<FullCalendar
			plugins={[dayGridPlugin]}
			initialView="dayGridMonth"
			locale={de}
			viewDidMount={(arg) => toggleVisible(true)}
			eventSources={[
				{
					url: '/events/list',
					color: 'blue',
				},
			]}
			eventContent={eventContent}
			eventSourceSuccess={(content, xhr) => toggleVisible(false)}
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
	);
}
