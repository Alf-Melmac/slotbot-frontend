import {Fragment, JSX} from 'react';
import {createPlugin, sliceEvents} from '@fullcalendar/core';
import {Indicator, Stack, Tabs, Text} from '@mantine/core';
import {dateRange} from '../../../../utils/dateHelper';
import dayjs, {Dayjs} from 'dayjs';
import {T} from '../../../../components/T';
import classes from './EventCalendarMobile.module.css';
import {Bold} from '../../../../components/Text/Bold';
import {EventCalendarItem} from './EventCalendarItem';

const noEventsTabValue = 'no-events';

function MobileView(props: Readonly<Parameters<typeof sliceEvents>[0]>): JSX.Element {
	const days = dateRange(props.dateProfile.currentRange.start, props.dateProfile.currentRange.end);
	const events = sliceEvents(props);
	const eventsByDay = Map.groupBy(events, e => e.range.start.getUTCDate());
	const anyEvents = events.length > 0;

	const firstEventDay = dayjs.utc(Math.min(...events.map(e => e.range.start.getTime())))
		.startOf('day');
	const defaultTab = anyEvents ? getTabValue(firstEventDay) : noEventsTabValue;
	// Key added to force re-render when defaultTab changes
	return <Tabs variant={'pills'} classNames={{list: classes.list}} defaultValue={defaultTab} key={defaultTab}>
		<Tabs.List>
			{days.map(day => {
				const unix = day.unix();
				const eventsOfThisDate = eventsByDay.get(day.date());
				const eventCount = eventsOfThisDate?.length;
				return <Indicator key={unix} label={eventCount} size={20} withBorder disabled={!eventCount}>
					<Tabs.Tab value={`${unix}`} disabled={(eventCount || 0) < 1}>
						<Stack gap={2} align={'center'}>
							<Text>{day.format('dd')}</Text>
							<Bold>{day.format('DD')}</Bold>
							{day.date() === 1 && <Text>{day.format('MMM')}</Text>}
						</Stack>
					</Tabs.Tab>
				</Indicator>;
			})}
		</Tabs.List>
		{anyEvents ?
			days.map(day => {
				const eventsAtDay = eventsByDay.get(day.date())?.sort((a, b) => a.range.start.getTime() - b.range.start.getTime());
				if (!eventsAtDay?.length) return <Fragment key={day.unix()}/>;
				return <Tabs.Panel key={day.unix()} value={getTabValue(day)}>
					<Stack>
						{eventsAtDay.map((renderRange) =>
							<EventCalendarItem key={renderRange.def.publicId} {...renderRange}/>)
						}
					</Stack>
				</Tabs.Panel>;
			})
			:
			<Tabs.Panel value={noEventsTabValue}>
				<Text ta="center">
					<T k={'calendar.emptyWeek'}/>
				</Text>
			</Tabs.Panel>
		}
	</Tabs>;
}

/**
 * Builds the tab value for the given day
 */
function getTabValue(day: Dayjs): string {
	return `${day.unix()}`;
}

export const EventCalendarMobile = createPlugin({
	name: 'mobile',
	views: {
		custom: {
			duration: {week: 1},
			component: MobileView,
		},
	},
});
