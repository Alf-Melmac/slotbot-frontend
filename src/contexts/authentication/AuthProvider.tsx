import {createContext, PropsWithChildren, useContext, useEffect, useState} from 'react';
import {DiscordUserDto} from './authenticationTypes';
import authenticationQuery from './authenticationQuery';
import {getBackendUrl} from '../../utils/urlHelper';

export function AuthProvider(props: PropsWithChildren): JSX.Element {
	const [user, setUser] = useState<AuthContextType['user']>();

	const {user: authenticatedUser} = authenticationQuery();

	useEffect(() => {
			setUser(authenticatedUser);
		}, [authenticatedUser],
	);

	const login = () => {
		window.location.href = `${getBackendUrl()}/oauth2/authorization/discord`;
	};

	const logout = () => {
		window.location.href = `${getBackendUrl()}/logout`;
	};

	return <AuthContext.Provider value={{user, login, logout}}>{props.children}</AuthContext.Provider>;
}

interface AuthContextType {
	user?: DiscordUserDto;
	login: () => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function useAuth() {
	return useContext(AuthContext);
}
