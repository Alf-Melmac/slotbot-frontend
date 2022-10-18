import {InlineEditableText} from '../../../components/Input/InlineEditable/InlineEditableText';
import {useState} from 'react';
import {FormTextInputProps} from './EventActionTextInput';
import {useFormContext} from '../../../contexts/event/action/EventActionFormContext';

export function EventActionTextInputEditMode(props: FormTextInputProps): JSX.Element {
	const {inputProps, formPath} = props;
	const form = useFormContext();
	const formInputProps = form.getInputProps(formPath);

	// const postTextChange = () => slotbotServerClient.put(`/events/${useEventPage()}/edit/text`).then((res) => res.data);
	const [oldValue, setOldValue] = useState<string>(formInputProps.value || '');
	return (
		<InlineEditableText {...inputProps} position={'group'} {...formInputProps}
							onSubmit={() => {
								console.log(formInputProps.value); //TODO mutate
								setOldValue(formInputProps.value);
								/*@ts-ignore text input must accept strings*/
							}} onCancel={() => form.setFieldValue(formPath, oldValue)}/>
	);
}
