import dayjs, {Dayjs} from 'dayjs';
import FullCalendar from '@fullcalendar/react';
import {CustomContentGenerator, EventContentArg, EventInput, EventSourceInput} from '@fullcalendar/core';
import de from '@fullcalendar/core/locales/de';
import dayGridPlugin from '@fullcalendar/daygrid';
import {Skeleton, Text} from '@mantine/core';
import {isGerman} from '../../../contexts/language/Language';
import {DATE_TEMPLATE} from '../../../utils/dateHelper';

const currentDay: Dayjs = dayjs();

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
			locale={isGerman() ? de : undefined}
			eventSources={getLoadingEvents()}
			eventContent={eventContent}
			validRange={{
				start: currentDay.startOf('month').format(DATE_TEMPLATE),
				end: currentDay.endOf('month').format(DATE_TEMPLATE),
			}}
		/>
	);
}
