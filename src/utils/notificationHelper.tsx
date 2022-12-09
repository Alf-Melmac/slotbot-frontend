import {showNotification} from '@mantine/notifications';
import {AxiosError} from 'axios';
import {MutationOptions} from '@tanstack/react-query';
import {T} from '../components/T';
import {ReactNode} from 'react';

export const successNotification = (message: ReactNode = <></>) => {
	showNotification({title: <T k={'success.notification'}/>, message: message, color: 'green'});
};

export const errorNotification: MutationOptions<unknown, AxiosError>['onError'] = (error) => {
	showNotification({
		title: <T k={'error.notification'} args={[error.code ? ` (${error.code})` : '']}/>,
		message: error.message,
		color: 'red',
	});
};
