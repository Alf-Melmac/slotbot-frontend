import {EventAction, EventActionPageProps} from '../EventActionPage';
import {TEXT} from '../../../../utils/maxLength';
import {InlineEditableText} from '../../../../components/Form/inline/InlineEditableText';
import {TextInputProps} from '@mantine/core';
import {TextInputMaxLength} from '../../../../components/Form/MaxLength/TextInputMaxLength';

const textInputProps: TextInputProps = {
	label: 'Titel',
	placeholder: 'Event Name',
	maxLength: TEXT,
	required: true,
};

export function EventTitle<FormReturnType extends EventAction>(props: EventActionPageProps<FormReturnType>): JSX.Element {
	const {editMode = false, form} = props;

	return <>
		{editMode ?
			<InlineEditableText {...textInputProps} position={'group'} {...form.getInputProps('name')}
								onSubmit={() => {
									console.log(form.values['name']); //TODO mutate
								}} onCancel={form.reset}/>
			:
			<TextInputMaxLength {...textInputProps} {...form.getInputProps('name')}/>
		}
	</>;
}
