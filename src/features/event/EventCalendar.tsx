import FullCalendar, {EventContentArg} from '@fullcalendar/react';
import de from '@fullcalendar/core/locales/de';
import dayGridPlugin from '@fullcalendar/daygrid';
import {ColorSwatch, createStyles, Text, Tooltip} from '@mantine/core';
import {showNotification} from '@mantine/notifications';
import {Bold} from '../../components/Text/Bold';
import {EventTooltip} from './EventTooltip';

const useStyles = createStyles((theme) => ({
	eventType: {
		minWidth: 10,
		minHeight: 10,
	},

	eventTitleWrapper: {
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
			<>
				<ColorSwatch color={backgroundColor} size={10} className={classes.eventType} mx={2}/>
				<Tooltip className={classes.eventTitleWrapper}
						 label={<EventTooltip eventName={event.title} {...event.extendedProps.shortInformation}/>}>
					<Text>{arg.timeText} <Bold>{event.title}</Bold></Text>
				</Tooltip>
			</>
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
