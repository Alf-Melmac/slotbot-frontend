import {showNotification} from '@mantine/notifications';
import {AxiosError} from 'axios';
import {MutationOptions} from '@tanstack/react-query';

export const successNotification = (message?: string) => {
	showNotification({title: 'Gespeichert', message: message ? message : <></>, color: 'green'});
}

export const errorNotification: MutationOptions<unknown, AxiosError>['onError'] = (error) => {
	showNotification({
		title: `Speichern fehlgeschlagen. ${error.code ? `(${error.code})` : ''}`,
		message: error.message,
		color: 'red',
	});
};
