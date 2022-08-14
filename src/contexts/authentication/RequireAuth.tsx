import {ReactNode} from 'react';
import {useAuth} from './AuthProvider';
import {OnMount} from '../../components/OnMount';

export function RequireAuth(props: { children: ReactNode }): JSX.Element {
	const {user, login} = useAuth();
	if (user === undefined) return <></>;

	return (<>
			{user ?
				props.children
				:
				<OnMount do={login}/>
			}
		</>
	);
}
