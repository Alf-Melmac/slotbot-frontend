import {ReactNode} from 'react';
import {useAuth} from './AuthProvider';
import {OnMount} from '../../components/OnMount';
import {ApplicationRoles} from './authenticationTypes';
import {NotAllowed} from '../../features/error/NotAllowed';
import {useCheckAccessQuery} from './useCheckAccess';

type RequireAuthProps = {
	children: ReactNode,
	authority?: ApplicationRoles;
}

export function RequireAuth(props: RequireAuthProps): JSX.Element {
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
				<NotAllowed/>
			:
			<OnMount do={login}/>
		}
	</>;
}
