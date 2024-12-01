import {useParams} from 'react-router';
import slotbotServerClient from '../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';
import {UserProfileDto} from './profileTypes';
import {ProfileInfo} from './ProfileInfo';
import {ProfileInfoLoading} from './loading/ProfileInfoLoading';
import {useTranslatedDocumentTitle} from '../../hooks/useDocumentTitle';
import {ProfilePageParams} from './ProfileRoutes';
import {JSX} from 'react';

export default function Profile(): JSX.Element {
	useTranslatedDocumentTitle('documentTitle.profile');
	const {userId} = useParams<ProfilePageParams>();
	if (!userId) throw Error('Invalid state: User id required');

	const getProfileInfo = () => slotbotServerClient.get(`/user/${userId}`).then((res) => res.data);
	const query = useQuery<UserProfileDto, Error>({
		queryKey: ['user', userId],
		queryFn: getProfileInfo,
	});
	const profileInfo = query.data;

	return <>
		{profileInfo ?
			<ProfileInfo profileInfo={profileInfo}/>
			:
			<ProfileInfoLoading/>
		}
	</>;
}
