import {useParams} from 'react-router-dom';
import {Nav} from '../../components/nav/Nav';
import {Container} from '@mantine/core';
import slotbotServerClient from '../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';
import {UserProfileDto} from './profileTypes';
import {ProfileInfo} from './ProfileInfo';

type ProfileProps = {
	userId: string
};

export function Profile(): JSX.Element {
	const {userId} = useParams<ProfileProps>();
	if (!userId) throw Error('Invalid state: User id required');

	const getProfileInfo = () => slotbotServerClient.get(`/user/${userId}`).then((res) => res.data);
	const query = useQuery<UserProfileDto, Error>(['user', userId], getProfileInfo);
	const profileInfo = query.data;

	return (
		<Nav>
			<Container>
				{profileInfo &&
                    <ProfileInfo profileInfo={profileInfo}/>
				}
			</Container>
		</Nav>
	);
}