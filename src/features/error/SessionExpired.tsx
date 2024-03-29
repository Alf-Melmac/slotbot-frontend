import {Alert, Center} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import {T} from '../../components/T';
import {useAuth} from '../../contexts/authentication/AuthProvider';
import {Navigate} from 'react-router-dom';
import {JSX} from 'react';

export function SessionExpired(): JSX.Element {
	if (useAuth().user) {
		return <Navigate to={'/events'} replace/>;
	}

	return (
		<Center>
			<Alert color={'red'} title={<T k={'session.expired'}/>}
				   icon={<FontAwesomeIcon icon={faCircleExclamation}/>}>
				<T k={'session.expired.description'}/>
			</Alert>
		</Center>
	);
}
