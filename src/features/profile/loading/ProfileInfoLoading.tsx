import {Center, createStyles, Paper, Skeleton, Stack, Title} from '@mantine/core';
import {userCardSize} from '../ProfileInfo';
import {T} from '../../../components/T';

const useStyles = createStyles((theme) => ({
	userCard: {
		...userCardSize(theme),
	},
}));

export function ProfileInfoLoading(): JSX.Element {
	const {classes} = useStyles();

	return (
		<Stack>
			<Center>
				<Paper withBorder className={classes.userCard} p={'lg'}>
					<Stack align={'center'} spacing={'xs'}>
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
