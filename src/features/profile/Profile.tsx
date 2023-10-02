import {useParams} from 'react-router-dom';
import slotbotServerClient from '../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';
import {UserProfileDto} from './profileTypes';
import {ProfileInfo} from './ProfileInfo';
import {ProfileInfoLoading} from './loading/ProfileInfoLoading';
import {useTranslatedDocumentTitle} from '../../hooks/useTranslatedDocumentTitle';
import {ProfilePageParams} from './ProfileRoutes';

export function Profile(): JSX.Element {
	useTranslatedDocumentTitle('documentTitle.profile');
	const {userId} = useParams<ProfilePageParams>();
	if (!userId) throw Error('Invalid state: User id required');

	const getProfileInfo = () => slotbotServerClient.get(`/user/${userId}`).then((res) => res.data);
	const query = useQuery<UserProfileDto, Error>(['user', userId], getProfileInfo);
	const profileInfo = query.data;

	return <>
		{profileInfo ?
			<ProfileInfo profileInfo={profileInfo}/>
			:
			<ProfileInfoLoading/>
		}
	</>;
}
