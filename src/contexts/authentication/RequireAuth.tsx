import {ReactNode} from 'react';
import {useAuth} from './AuthProvider';
import {OnMount} from '../../components/OnMount';
import {ApplicationRoles} from './authenticationTypes';
import {Navigate} from 'react-router-dom';
import checkAccessQuery from './checkAccessQuery';

type RequireAuthProps = {
	children: ReactNode,
	authority?: ApplicationRoles;
}

export function RequireAuth(props: RequireAuthProps): JSX.Element {
	const {children, authority} = props;

	const {user, login} = useAuth();

	const {query, accessAllowed} = checkAccessQuery(authority);

	if (user === undefined || (authority && query.isLoading)) return <></>;

	const allowed = authority === undefined ? true : authority && accessAllowed;
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
