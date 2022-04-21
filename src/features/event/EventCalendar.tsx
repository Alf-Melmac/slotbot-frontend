import FullCalendar, {EventContentArg} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import de from "@fullcalendar/core/locales/de";
import {ColorSwatch, createStyles, Text, Tooltip} from "@mantine/core";
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

type EventCalendarProps = {};

export function EventCalendar(props: EventCalendarProps): JSX.Element {
	const {} = props;
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
			eventSources={[
				{
					url: '/events/list',
					color: 'blue',
				},
			]}
			eventContent={eventContent}
		/>
	);
}
