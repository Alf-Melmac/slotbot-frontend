import {useEffect, useState} from 'react';
import checkAccessQuery from './checkAccessQuery';
import {ApplicationRoles} from './authenticationTypes';

export function useCheckAccess(authority?: ApplicationRoles): boolean {
	const [allowed, setAllowed] = useState(false);

	const {query, accessAllowed} = checkAccessQuery(authority);
	useEffect(() => {
		if (query.isSuccess) {
			setAllowed(accessAllowed || false);
		}
	}, [accessAllowed]);

	return allowed;
}
