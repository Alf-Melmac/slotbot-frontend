import {JSX, ReactNode} from 'react';
import {useAuth} from './AuthProvider';
import {OnMount} from '../../components/OnMount';
import {ApplicationRoles} from './authenticationTypes';
import {NotAllowedPage} from '../../Router';
import {useCheckAccessQuery} from './useCheckAccess';

type RequireAuthProps = {
	children: ReactNode,
	authority?: ApplicationRoles;
}

export function RequireAuth(props: Readonly<RequireAuthProps>): JSX.Element {
	const {children, authority} = props;

	const {user, login} = useAuth();

	const {query, accessAllowed} = useCheckAccessQuery(authority);

	if (user === undefined || (authority && query.isLoading)) return <></>;

	const allowed = authority === undefined ? true : authority && accessAllowed;
	return <>
		{user ?
			allowed ?
				children
				:
				<NotAllowedPage/>
			:
			<OnMount do={login}/>
		}
	</>;
}
