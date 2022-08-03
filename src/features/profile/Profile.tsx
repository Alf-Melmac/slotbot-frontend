import {useParams} from 'react-router-dom';
import {Nav} from '../../components/nav/Nav';
import {Avatar, Center, Container, createStyles, Paper, Stack, Text, TextInput, Title} from '@mantine/core';
import slotbotServerClient from '../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';
import {UserProfileDto} from './profileTypes';
import userQuery from '../user/userQuery';

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

	const {user} = userQuery();

	return (
		<Nav>
			<Container>
				<Center>
					<Paper withBorder className={classes.userCard} p={'lg'}>
						{profileInfo &&
                            <>
                                <Stack align={'center'} spacing={'xs'}>
                                    <Avatar src={profileInfo.user.avatarUrl} size={'xl'} radius={1000}/>
                                    <Title order={2} align={'center'}>{profileInfo.user.name}</Title>
									{user &&
                                        <Text color={'dimmed'} align={'center'}>{profileInfo.roles}</Text>
									}
									{profileInfo.ownProfile &&
                                        <TextInput label={'Steam-ID'} value={profileInfo.steamId64}/>
									}
                                    <Text mt={'xl'} size={'xl'}>{profileInfo.participatedEventsCount}</Text>
                                    <Title order={5}>Event-Teilnahmen</Title>
                                </Stack>
                            </>
						}
					</Paper>
				</Center>
			</Container>
		</Nav>
	);
}
