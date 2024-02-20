import {Center, Paper, Skeleton, Stack, Title} from '@mantine/core';
import {T} from '../../../components/T';
import {JSX} from 'react';

export function ProfileInfoLoading(): JSX.Element {
	return (
		<Stack>
			<Center>
				<Paper withBorder w={{base: '100%', md: '33%'}} p={'lg'}>
					<Stack align={'center'} gap={'xs'}>
						<Skeleton circle height={84}/>
						<Skeleton width={'70%'} height={35}/>
						<Skeleton width={'20%'} height={31} mt={'xl'}/>
						<Title order={5}><T k={'profile.info.participatedEvents'}/></Title>
					</Stack>
				</Paper>
			</Center>
		</Stack>
	);
}
