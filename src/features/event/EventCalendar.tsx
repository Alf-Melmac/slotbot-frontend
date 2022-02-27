import FullCalendar, {EventContentArg} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import de from "@fullcalendar/core/locales/de";
import {ColorSwatch, Group, Text, Tooltip} from "@mantine/core";

type EventCalendarProps = {};

export function EventCalendar(props: EventCalendarProps): JSX.Element {
	const {} = props;
	const eventContent = (arg: EventContentArg) => {
		return (
			<Group noWrap style={{minWidth: 0, gap: 2, overflow: "hidden"}}>
				<ColorSwatch color={arg.backgroundColor} size={10} style={{minWidth: 10}}/>
				<Tooltip label={<span dangerouslySetInnerHTML={{__html: arg.event.extendedProps.description}}></span>}>
					<Text>{arg.timeText} {arg.event.title}</Text>
				</Tooltip>
			</Group>
		);
	}

	return (
		<FullCalendar
			plugins={[dayGridPlugin]}
			initialView="dayGridMonth"
			locale={de}
			eventSources={[
				{
					url: 'http://localhost:8090/events/list',
					color: 'blue'
				}
			]}
			eventContent={eventContent}
		/>
	);
}
