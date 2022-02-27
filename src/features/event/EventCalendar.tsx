import {ColorSwatch, Group, Text, Tooltip} from "@mantine/core";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import "moment/locale/de";

require('react-big-calendar/lib/css/react-big-calendar.css');

type EventCalendarProps = {};

export function EventCalendar(props: EventCalendarProps): JSX.Element {
	const {} = props;
	const eventContent = (arg: any) => {
		return (
			<Group noWrap style={{minWidth: 0, gap: 2, overflow: "hidden"}}>
				<ColorSwatch color={arg.backgroundColor} size={10} style={{minWidth: 10}}/>
				<Tooltip label={<span dangerouslySetInnerHTML={{__html: arg.event.extendedProps.description}}></span>}>
					<Text>{arg.timeText} {arg.event.title}</Text>
				</Tooltip>
			</Group>
		);
	}


	const events = [
		{
			start: moment().toDate(),
			end: moment()
				.add(1, "hour")
				.toDate(),
			title: "Some title"
		}
	];

	moment.locale("de");
	return (
		<Calendar
			localizer={momentLocalizer(moment)}
			events={events}
			defaultView="month"
			/*components={{
				event: eventContent
			}}*/
			toolbar={false}
			style={{height: 500}}
		/>
	);
}
