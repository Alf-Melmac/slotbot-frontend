import {createContext, JSX, PropsWithChildren, useContext, useEffect, useMemo, useState} from 'react';
import {DiscordUserDto} from './authenticationTypes';
import authenticationQuery from './authenticationQuery';
import {getBackendUrl} from '../../utils/urlHelper';

export function AuthProvider(props: Readonly<PropsWithChildren>): JSX.Element {
	const [user, setUser] = useState<AuthContextType['user']>();

	const {user: authenticatedUser} = authenticationQuery();

	useEffect(() => {
			setUser(authenticatedUser);
		}, [authenticatedUser],
	);

	const login = () => {
		globalThis.location.href = `${getBackendUrl()}/login?redirectUrl=${globalThis.location.pathname}`;
	};

	const logout = () => {
		globalThis.location.href = `${getBackendUrl()}/logout`;
	};

	const value = useMemo((): AuthContextType => ({user, login, logout}), [user, login, logout]);
	return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
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
