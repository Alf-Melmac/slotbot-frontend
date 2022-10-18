import {InlineEditableText} from '../../../components/Input/InlineEditable/InlineEditableText';
import {useState} from 'react';
import {FormTextInputProps} from './EventActionTextInput';
import {useFormContext} from '../../../contexts/event/action/EventActionFormContext';
import slotbotServerClient, {voidFunction} from '../../../hooks/slotbotServerClient';
import {useEventPage} from '../../../contexts/event/EventPageContext';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {showNotification} from '@mantine/notifications';

export function EventActionTextInputEditMode(props: FormTextInputProps): JSX.Element {
	const {inputProps, formPath} = props;
	const eventId = useEventPage();
	const form = useFormContext();
	const formInputProps = form.getInputProps(formPath);

	const [oldValue, setOldValue] = useState<string>(formInputProps.value || '');
	const postTextChange = () => slotbotServerClient.put(`/events/${eventId}/edit/text`, {
		key: formPath,
		value: formInputProps.value
	}).then(voidFunction);
	const {mutate} = useMutation<void, AxiosError>(postTextChange, {
		onSuccess: () => {
			setOldValue(formInputProps.value);
			showNotification({title: 'Gespeichert', message: formInputProps.value, color: 'green'});
		},
		onError: error => {
			showNotification({
				title: `Speichern fehlgeschlagen. ${error.code ? `(${error.code})` : ''}`,
				message: error.message,
				color: 'red',
			});
		},
	});
	return (
		<InlineEditableText {...inputProps} position={'group'} {...formInputProps}
							onSubmit={mutate} onCancel={() => form.setFieldValue(formPath, oldValue)}/>
	);
}
