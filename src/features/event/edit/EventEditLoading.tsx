import {DelayedSkeleton} from '../../../components/Delayed/DelayedSkeleton';
import {Container, Grid, Stack, Text, Title} from '@mantine/core';
import {JSX} from 'react';

const DEFAULT_INPUT_HEIGHT = 60;

export function EventEditLoading(): JSX.Element {
	return <Container p={16}>
		<DelayedSkeleton>
			<Text>Loading breadcrumb</Text>
		</DelayedSkeleton>

		<Stack>
			<DelayedSkeleton mt={8}>
				<Title order={2} mb={'xs'}>Loading event action title</Title>
			</DelayedSkeleton>

			<Grid>
				<Grid.Col span={{base: 12, md: 9}}>
					<DelayedSkeleton height={DEFAULT_INPUT_HEIGHT}/>
				</Grid.Col>
				<Grid.Col span={{base: 12, md: 3}}>
					<DelayedSkeleton height={DEFAULT_INPUT_HEIGHT}/>
				</Grid.Col>
			</Grid>

			<Grid>
				<Grid.Col span={{base: 6, md: 4}}>
					<DelayedSkeleton height={DEFAULT_INPUT_HEIGHT}/>
				</Grid.Col>
				<Grid.Col span={{base: 6, md: 4}}>
					<DelayedSkeleton height={DEFAULT_INPUT_HEIGHT}/>
				</Grid.Col>
				<Grid.Col span={{base: 12, md: 4}}>
					<DelayedSkeleton height={DEFAULT_INPUT_HEIGHT}/>
				</Grid.Col>
			</Grid>

			<DelayedSkeleton height={DEFAULT_INPUT_HEIGHT}/>

			<DelayedSkeleton height={DEFAULT_INPUT_HEIGHT * 2}/>

			<Grid>
				<Grid.Col span={4}>
					<DelayedSkeleton height={DEFAULT_INPUT_HEIGHT}/>
				</Grid.Col>
				<Grid.Col span={4}>
					<DelayedSkeleton height={DEFAULT_INPUT_HEIGHT}/>
				</Grid.Col>
				<Grid.Col span={4}>
					<DelayedSkeleton height={DEFAULT_INPUT_HEIGHT}/>
				</Grid.Col>
			</Grid>
		</Stack>
	</Container>;
}
