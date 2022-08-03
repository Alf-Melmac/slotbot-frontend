import slotbotServerClient from '../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';
import {DiscordUserDto} from './authenticationTypes';

export default function userQuery() {
	const getAuth = () => slotbotServerClient.get('/authentication').then((res) => res.data);
	const query = useQuery<DiscordUserDto, Error>(['authentication'], getAuth);
	const user = query.data;

	return {query, user};
}
