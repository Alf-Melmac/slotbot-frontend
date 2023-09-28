import {Alert, Center} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import {T} from '../../components/T';

export function SessionExpired(): JSX.Element {
	return <Center>
		<Alert color={'red'} title={<T k={'session.expired'}/>} icon={<FontAwesomeIcon icon={faCircleExclamation}/>}>
			<T k={'session.expired.description'}/>
		</Alert>
	</Center>;
}
