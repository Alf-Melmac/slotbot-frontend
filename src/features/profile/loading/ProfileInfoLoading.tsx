import {Center, Group, Paper, Skeleton, Stack, Title, useMantineTheme} from '@mantine/core';
import {T} from '../../../components/T';
import {JSX} from 'react';

export function ProfileInfoLoading(): JSX.Element {
	const theme = useMantineTheme();

	return (
		<Stack>
			<Center>
				<Paper withBorder w={{base: '100%', md: '33%'}} p={'lg'}>
					<Stack align={'center'} gap={'xs'}>
						<Skeleton circle height={84}/>
						<Skeleton width={'70%'} height={theme.headings.sizes.h2.lineHeight}/>

						<Group mt={'xl'} justify={'center'}>
							<Stack align={'center'} gap={'xs'}>
								<Title order={5}><T k={'profile.info.participatedEvents'}/></Title>
								<Skeleton width={'40%'} height={theme.headings.sizes.h5.lineHeight}/>
							</Stack>
							<Stack align={'center'} gap={'xs'}>
								<Title order={5}><T k={'profile.info.lastEvent'}/></Title>
								<Skeleton height={theme.headings.sizes.h5.lineHeight}/>
							</Stack>
						</Group>
					</Stack>
				</Paper>
			</Center>
		</Stack>
	);
}
