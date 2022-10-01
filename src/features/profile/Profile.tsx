import {useParams} from 'react-router-dom';
import {Nav} from '../../components/nav/Nav';
import {Container} from '@mantine/core';
import slotbotServerClient from '../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';
import {UserProfileDto} from './profileTypes';
import {ProfileInfo} from './ProfileInfo';
import {ProfileInfoLoading} from './loading/ProfileInfoLoading';
import {useDocumentTitle} from '@mantine/hooks';

type ProfileProps = {
	userId: string
};

export function Profile(): JSX.Element {
	useDocumentTitle('Profil');
	const {userId} = useParams<ProfileProps>();
	if (!userId) throw Error('Invalid state: User id required');

	const getProfileInfo = () => slotbotServerClient.get(`/user/${userId}`).then((res) => res.data);
	const query = useQuery<UserProfileDto, Error>(['user', userId], getProfileInfo);
	const profileInfo = query.data;

	return (
		<Nav>
			<Container>
				{profileInfo ?
					<ProfileInfo profileInfo={profileInfo}/>
					:
					<ProfileInfoLoading/>
				}
			</Container>
		</Nav>
	);
}
