import {Fragment, JSX} from 'react';
import dayjs from 'dayjs';
import {Card, Flex, Group, Paper, Text} from '@mantine/core';
import classes from './HomeEventList.module.css';
import homeClasses from './Home.module.css';
import cx from 'clsx';
import {T} from '../../components/T';
import {AnchorLink} from '../../components/Text/AnchorLink';
import {Bold} from '../../components/Text/Bold';
import slotbotServerClient from '../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';
import {GeneralError} from '../../components/error/GeneralError';
import {CalendarEventDto} from '../event/eventTypes';
import {HomeEventListLoading} from './HomeEventListLoading';

export function HomeEventList(): JSX.Element {
	const getEventsAroundToday = () => slotbotServerClient.get('/events/around-today').then((res) => res.data);
	const query = useQuery<CalendarEventDto[], Error>({
		queryKey: ['events-around-today'],
		queryFn: getEventsAroundToday,
	});
	if (query.isError) return <GeneralError error={query.error}/>;
	if (query.isLoading) return <HomeEventListLoading/>;

	let prevMonth: number;
	let todayShown: boolean;
	const items = query.data?.map((event) => {
		const eventDate = dayjs(event.start);
		const currentMonth = eventDate.month();
		const isFirstEventOfMonth = prevMonth !== currentMonth;
		prevMonth = currentMonth;

		let showToday;
		if (!todayShown) {
			showToday = dayjs().isSameOrBefore(eventDate, 'day');
			todayShown = showToday;
		}

		return <Fragment key={event.id}>
			{isFirstEventOfMonth &&
                <Text className={classes.month}>{eventDate.format('MMMM')}</Text>
			}
			{showToday &&
                <Flex align={'center'}>
                    <hr className={cx(classes.todayRuler, classes.todayRulerLeft)}/>
                    <Text mx={'sm'} size={'sm'}><T k={'today'}/></Text>
                    <hr className={cx(classes.todayRuler, classes.todayRulerRight)}/>
                </Flex>
			}
			<AnchorLink to={`/events/${event.id}`}>
				<Group wrap={'nowrap'} className={classes.item}>
					<Paper className={classes.date}>
						<Text size={'xs'}>{eventDate.format('dd')}</Text>
						<Bold size={'md'}>{eventDate.date()}</Bold>
					</Paper>
					<Text
						className={cx(classes.link, {[classes.linkActive]: dayjs().isSame(eventDate, 'day')})}
					>
						{event.title}
					</Text>
				</Group>
			</AnchorLink>
		</Fragment>;
	});

	return <Card px={0} py={4} className={cx(classes.links, homeClasses.homeChild)}>
		{items}
	</Card>;
}
