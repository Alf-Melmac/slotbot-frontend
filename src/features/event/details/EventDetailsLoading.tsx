import {Box, Container, Grid, MediaQuery, Skeleton, Text, Title} from '@mantine/core';
import {NAV_HEIGHT} from '../../../components/Nav';

export function EventDetailsLoading(): JSX.Element {
	return (
		<>
			<Skeleton height={NAV_HEIGHT}>Nav placeholder</Skeleton>
			<Container p={16}>
				<Skeleton>
					<Text>Loading breadcrumb</Text>
				</Skeleton>

				<Grid gutter={'xl'} mt={1}>
					<Grid.Col span={4}>
						<Skeleton width={'100%'} height={350}>
						</Skeleton>
					</Grid.Col>

					<Grid.Col span={8}>
						<Skeleton>
							<Title order={1}>Loading Title</Title>
						</Skeleton>
						<Skeleton>
							<Text>Loading time date and length</Text>
						</Skeleton>

						<Box mt={'sm'}>
							<MediaQuery largerThan={'md'} styles={{display: 'none'}}>
								<Skeleton height={55}/>
							</MediaQuery>
							<MediaQuery smallerThan={'md'} styles={{display: 'none'}}>
								<Skeleton height={130}/>
							</MediaQuery>
						</Box>
					</Grid.Col>
				</Grid>

				<Skeleton mt={4} width={'20%'}>
					<Text size={'xs'}>Creator</Text>
				</Skeleton>

				<Skeleton mt={10} height={200}>H</Skeleton>
			</Container>
		</>
	);
}
