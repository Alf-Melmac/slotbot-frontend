import {DelayedSkeleton} from '../../../components/Delayed/DelayedSkeleton';
import {Paper, SimpleGrid, Stack, Text, Title} from '@mantine/core';
import {T} from '../../../components/T';
import {useGuildStyles} from './Guild';
import {DelayedVisible} from '../../../components/Delayed/DelayedVisible';
import {JSX} from 'react';

export function GuildLoading(): JSX.Element {
	const {classes} = useGuildStyles();

	return <>
		<DelayedSkeleton mb={'xs'}>
			<Text>Loading breadcrumb</Text>
		</DelayedSkeleton>

		<DelayedVisible component={Paper} withBorder p={'lg'} className={classes.guildCard} mb={'md'}>
			<Stack align={'stretch'}>
				<Stack align={'center'}>
					<DelayedSkeleton width={'20%'} height={35}/>
					<DelayedSkeleton width={240} height={240}/>
				</Stack>
				<SimpleGrid cols={2}>
					<Stack align={'center'}>
						<Title order={2}><T k={'guild.tag'}/></Title>
						<DelayedSkeleton width={40}>
							Idtfr
						</DelayedSkeleton>
					</Stack>
					<Stack align={'center'}>
						<Title order={2}><T k={'nav.calendar'}/></Title>
						<DelayedSkeleton width={'60%'}>
							Base url
						</DelayedSkeleton>
					</Stack>
				</SimpleGrid>
			</Stack>
		</DelayedVisible>

		<DelayedSkeleton height={180}/>
	</>;
}
