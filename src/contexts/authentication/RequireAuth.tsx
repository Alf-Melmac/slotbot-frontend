import {ReactNode} from 'react';
import {useAuth} from './AuthProvider';
import {OnMount} from '../../components/OnMount';
import {ApplicationRoles} from './authenticationTypes';
import {Navigate} from 'react-router-dom';
import slotbotServerClient from '../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';

type RequireAuthProps = {
	children: ReactNode,
	authority?: ApplicationRoles;
}

export function RequireAuth(props: RequireAuthProps): JSX.Element {
	const {children, authority} = props;

	const {user, login} = useAuth();

	const getAllowedToAccess = () => slotbotServerClient.get(`/authentication/access/${authority}`).then((res) => res.data);
	const query = useQuery<boolean>(['allowedToAccess', authority], getAllowedToAccess, {enabled: !!authority});

	if (user === undefined || query.isLoading) return <></>;

	let allowed = authority && query.data;
	return <>
		{user ?
			allowed ?
				children
				:
				<Navigate to={"/403"} replace/>
			:
			<OnMount do={login}/>
		}
	</>;
}
