import {DelayedSkeleton} from '../../../components/Delayed/DelayedSkeleton';
import {Button, Group, Stack, Text, Title} from '@mantine/core';
import {T} from '../../../components/T';
import {DelayedVisible} from '../../../components/Delayed/DelayedVisible';
import {JSX} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowUpRightFromSquare} from '@fortawesome/free-solid-svg-icons';

export function GuildLoading(): JSX.Element {
	return <>
		<DelayedSkeleton mb={'xs'}>
			<Text>Loading breadcrumb</Text>
		</DelayedSkeleton>

		<Group justify={'space-between'} align={'center'} mb={'md'}>
			<Stack gap={'xs'}>
				<Group align={'flex-start'}>
					<DelayedSkeleton width={54} height={54}/>
					<DelayedSkeleton width={200}>
						<Title order={1} fw={100}>Title</Title>
					</DelayedSkeleton>
				</Group>
				<DelayedSkeleton>
					<Text size={'sm'}>this may be length</Text>
				</DelayedSkeleton>
			</Stack>
			<DelayedVisible component={Button} leftSection={<FontAwesomeIcon icon={faArrowUpRightFromSquare}/>}
							disabled>
				<T k={'nav.calendar'}/>
			</DelayedVisible>
		</Group>

		<DelayedVisible component={Title} order={2} mt={'lg'}><T k={'members'}/></DelayedVisible>
		<DelayedSkeleton height={180}/>
	</>;
}
