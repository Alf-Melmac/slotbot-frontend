import {JSX} from 'react';
import classes from './HomeEventList.module.css';
import {Card, Group, Skeleton, Text} from '@mantine/core';
import dayjs from 'dayjs';
import {DelayedVisible} from '../../components/Delayed/DelayedVisible';

export function HomeEventListLoading(): JSX.Element {
	return <DelayedVisible component={Card} px={0} py={4} className={classes.links}>
		<Text className={classes.month}>{dayjs().format('MMMM')}</Text>

		{Array.from({length: 3}).map((_, i) => (
			<Group wrap={'nowrap'} h={50} className={classes.item} key={i}>
				<Skeleton width={25} height={40}/>
				<Skeleton height={40}/>
			</Group>
		))}
	</DelayedVisible>;
}
