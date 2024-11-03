import {JSX} from 'react';
import {Box, Paper, Skeleton, Stack, Text, Title} from '@mantine/core';
import {DelayedSkeleton} from '../../../../components/Delayed/DelayedSkeleton';
import {T} from '../../../../components/T';
import {DelayedVisible} from '../../../../components/Delayed/DelayedVisible';
import classes from './GuildConfig.module.css';

export function GuildConfigLoading(): JSX.Element {
	return <>
		<DelayedSkeleton mb={'xs'}>
			<Text>Loading breadcrumb</Text>
		</DelayedSkeleton>

		<DelayedVisible component={Stack} gap={'lg'}>
			<Box>
				<Title order={1}><T k={'configuration'}/></Title>
				<T k={'configuration.description'}/>
			</Box>

			{[...Array(3)].map((_, i) => (
				<ConfigItemLoading key={i}/>
			))}
		</DelayedVisible>
	</>;
}

function ConfigItemLoading(): JSX.Element {
	return <Stack gap={'xs'}>
		<Skeleton width={180}><Title order={2} size={'h3'}>Title</Title></Skeleton>
		<Paper p={'md'} withBorder className={classes.card}>
			<Skeleton height={250}/>
		</Paper>
	</Stack>;
}
