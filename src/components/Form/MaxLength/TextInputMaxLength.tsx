import {TextInput, TextInputProps} from '@mantine/core';
import {omit} from 'lodash';
import {MaxLengthHelper} from './MaxLengthHelper';

export function TextInputMaxLength<FormReturnType>(props: TextInputProps): JSX.Element {
	const {maxLength, value} = props;

	if (typeof value !== 'string') {
		throw Error('Wrong component used.');
	}
	return (
		<TextInput {...omit(props, ['useFormReturn', 'inputProp'])}
				   {...MaxLengthHelper(maxLength, value)}/>
	);
}
