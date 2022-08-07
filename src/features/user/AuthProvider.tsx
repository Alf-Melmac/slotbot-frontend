import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {DiscordUserDto} from './authenticationTypes';
import userQuery from './userQuery';

type AuthProviderProps = {
	children: ReactNode;
};

export function AuthProvider(props: AuthProviderProps): JSX.Element {
	const [user, setUser] = useState<AuthContextType['user']>();

	const {user: authenticatedUser} = userQuery();

	useEffect(() => {
			setUser(authenticatedUser);
		}, [authenticatedUser],
	);

	const login = () => {
		window.location.href = 'http://localhost:8090/oauth2/authorization/discord';
	};

	const logout = () => {
		window.location.href = 'http://localhost:8090/logout';
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
