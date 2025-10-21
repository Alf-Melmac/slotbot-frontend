import {JSX} from 'react';
import {LoadingCalendarProps} from '../LoadingCalendar';
import FullCalendar from '@fullcalendar/react';
import {useIsGerman} from '../../../../contexts/language/Language';
import de from '@fullcalendar/core/locales/de';
import {DATE_TEMPLATE, dayjsRange} from '../../../../utils/dateHelper';
import dayjs, {Dayjs} from 'dayjs';
import {createPlugin, sliceEvents} from '@fullcalendar/core';
import {Skeleton, Stack, Tabs, Text} from '@mantine/core';
import classes from './EventCalendarMobile.module.css';
import {Bold} from '../../../../components/Text/Bold';

const currentDay: Dayjs = dayjs();

export function LoadingMobileCalendar({animated}: Readonly<LoadingCalendarProps>): JSX.Element {
	return <FullCalendar
		plugins={[EventCalendarMobileLoading]}
		initialView={'custom'}
		locale={useIsGerman() ? de : undefined}
		eventStartEditable={animated} // FullCalendar plugins don't support react hooks, so we just use a random prop
		validRange={{
			start: currentDay.startOf('week').format(DATE_TEMPLATE),
			end: currentDay.endOf('week').add(1, 'day').format(DATE_TEMPLATE),
		}}
	/>;
}

function MobileViewLoading(props: Readonly<Parameters<typeof sliceEvents>[0]>): JSX.Element {
	const days = dayjsRange(currentDay.startOf('week'), currentDay.endOf('week'));
	console.log(currentDay.startOf('week'), currentDay.endOf('week'), days);
	return <Tabs variant={'pills'} classNames={{list: classes.list}}>
		<Tabs.List>
			{days.map(day => {
				const unix = day.unix();
				return <Tabs.Tab key={unix} value={`${unix}`} disabled>
					<Stack gap={2} align={'center'}>
						<Text>{day.format('dd')}</Text>
						<Bold>{day.format('DD')}</Bold>
						{day.date() === 1 && <Text>{day.format('MMM')}</Text>}
					</Stack>
				</Tabs.Tab>;
			})}
		</Tabs.List>
		<Skeleton height={230} animate={props.eventUiBases['']?.startEditable ?? false}/>
	</Tabs>;
}

const EventCalendarMobileLoading = createPlugin({
	name: 'mobile',
	views: {
		custom: {
			duration: {week: 1},
			component: MobileViewLoading,
		},
	},
});
