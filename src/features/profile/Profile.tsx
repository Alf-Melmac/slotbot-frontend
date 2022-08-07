import {useParams} from 'react-router-dom';
import {Nav} from '../../components/nav/Nav';
import {Center, Container, createStyles, Paper} from '@mantine/core';
import slotbotServerClient from '../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';
import {UserProfileDto} from './profileTypes';
import {ProfileInfo} from './ProfileInfo';

const useStyles = createStyles((theme) => ({
	userCard: {
		width: '33%',
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,

		[theme.fn.smallerThan('md')]: {
			width: '100%',
		},
	},
}));

type ProfileProps = {
	userId: string
};

export function Profile(): JSX.Element {
	const {userId} = useParams<ProfileProps>();
	if (!userId) throw Error('Invalid state: User id required');

	const {classes} = useStyles();

	const getAuth = () => slotbotServerClient.get(`/user/${userId}`).then((res) => res.data);
	const query = useQuery<UserProfileDto, Error>(['user', userId], getAuth);
	const profileInfo = query.data;

	return (
		<Nav>
			<Container>
				<Center>
					<Paper withBorder className={classes.userCard} p={'lg'}>
						{profileInfo &&
                            <ProfileInfo profileInfo={profileInfo}/>
						}
					</Paper>
				</Center>
			</Container>
		</Nav>
	);
}
