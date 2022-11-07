import dayjs, {Dayjs} from 'dayjs';
import '@fullcalendar/react/dist/vdom'; //Vite fix for fullcalendar
import FullCalendar, {EventContentArg, EventInput} from '@fullcalendar/react';
import {CustomContentGenerator, EventSourceInput} from '@fullcalendar/core';
import de from '@fullcalendar/core/locales/de';
import dayGridPlugin from '@fullcalendar/daygrid';
import {Skeleton, Text} from '@mantine/core';

const currentDay: Dayjs = dayjs();
const dateFormat = 'YYYY-MM-DD';

function getLoadingEvents(): EventSourceInput[] {
	const events: EventInput[] = [];
	for (let i = 1; i <= currentDay.daysInMonth(); i++) {
		events.push({
			title: `Event${i}`,
			start: `${currentDay.year()}-${enforceTwoDigits(currentDay.month() + 1)}-${enforceTwoDigits(i)}`,
			mock: true,
		});
	}

	return [{
		id: 'loadingSource',
		events: events,
	}];
}

function enforceTwoDigits(val: number): string {
	return val < 10 ? `0${val}` : val.toString();
}

type LoadingCalendarProps = {
	animated: boolean;
};

export function LoadingCalendar(props: LoadingCalendarProps): JSX.Element {
	const {animated} = props;

	const eventContent: CustomContentGenerator<EventContentArg> = (arg: EventContentArg) => {
		return (
			<Skeleton animate={animated}>
				<Text>{arg.event.title}</Text>
			</Skeleton>
		);
	};
	return (
		<FullCalendar
			plugins={[dayGridPlugin]}
			initialView="dayGridMonth"
			locale={de}
			eventSources={getLoadingEvents()}
			eventContent={eventContent}
			validRange={{
				start: currentDay.startOf('month').format(dateFormat),
				end: currentDay.endOf('month').format(dateFormat),
			}}
		/>
	);
}
