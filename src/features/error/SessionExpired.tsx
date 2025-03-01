import {Alert, Center} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import {T} from '../../components/T';
import {useAuth} from '../../contexts/authentication/AuthProvider';
import {Navigate} from 'react-router';
import {JSX} from 'react';
import {useHomeNavigationPath} from '../home/useHomeNavigation';

export default function SessionExpired(): JSX.Element {
	const homePath = useHomeNavigationPath();
	if (useAuth().user) {
		return <Navigate to={homePath} replace/>;
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
