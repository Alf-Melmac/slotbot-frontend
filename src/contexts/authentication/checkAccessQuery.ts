import slotbotServerClient from '../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';
import {ApplicationRoles} from './authenticationTypes';

export default function checkAccessQuery(authority?: ApplicationRoles) {
	const getAllowedToAccess = () => slotbotServerClient.get(`/authentication/access/${authority}`).then((res) => res.data);
	const query = useQuery<boolean>(['allowedToAccess', authority], getAllowedToAccess, {enabled: !!authority});
	const accessAllowed = query.data;

	return {query, accessAllowed};
}
