import {Box, Container, Grid, MediaQuery, Text, Title} from '@mantine/core';
import {DelayedSkeleton} from '../../../components/Delayed/DelayedSkeleton';
import {hidden} from '../../../contexts/CommonStylings';
import {JSX} from 'react';

export function EventDetailsLoading(): JSX.Element {
	return <Container p={16}>
		<DelayedSkeleton>
			<Text>Loading breadcrumb</Text>
		</DelayedSkeleton>

		<Grid gutter={'xl'} mt={1}>
			<Grid.Col span={4}>
				<DelayedSkeleton width={'100%'} height={350}/>
			</Grid.Col>

			<Grid.Col span={8}>
				<DelayedSkeleton>
					<Title order={1}>Loading Title</Title>
				</DelayedSkeleton>
				<DelayedSkeleton>
					<Text>Loading time date and length</Text>
				</DelayedSkeleton>

				<Box mt={'sm'}>
					<MediaQuery largerThan={'md'} styles={hidden}>
						<DelayedSkeleton height={55}/>
					</MediaQuery>
					<MediaQuery smallerThan={'md'} styles={hidden}>
						<DelayedSkeleton height={130}/>
					</MediaQuery>
				</Box>
			</Grid.Col>
		</Grid>

		<DelayedSkeleton mt={4} width={'20%'}>
			<Text size={'xs'}>Creator</Text>
		</DelayedSkeleton>

		<DelayedSkeleton mt={10} height={200}>H</DelayedSkeleton>
	</Container>;
}
