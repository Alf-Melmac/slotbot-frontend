import {Box, Container, Grid, MediaQuery, Text, Title} from '@mantine/core';
import {NAV_HEIGHT} from '../../../components/nav/Nav';
import {DelayedSkeleton} from '../../../components/DelayedSkeleton';

export function EventDetailsLoading(): JSX.Element {
	return (
		<>
			<DelayedSkeleton height={NAV_HEIGHT}>Nav placeholder</DelayedSkeleton>
			<Container p={16}>
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
							<MediaQuery largerThan={'md'} styles={{display: 'none'}}>
								<DelayedSkeleton height={55}/>
							</MediaQuery>
							<MediaQuery smallerThan={'md'} styles={{display: 'none'}}>
								<DelayedSkeleton height={130}/>
							</MediaQuery>
						</Box>
					</Grid.Col>
				</Grid>

				<DelayedSkeleton mt={4} width={'20%'}>
					<Text size={'xs'}>Creator</Text>
				</DelayedSkeleton>

				<DelayedSkeleton mt={10} height={200}>H</DelayedSkeleton>
			</Container>
		</>
	);
}
