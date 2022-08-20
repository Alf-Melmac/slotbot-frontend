import {UseFormReturnType} from '@mantine/form';
import {TextInput, TextInputProps} from '@mantine/core';
import {omit} from 'lodash';
import {MaxLengthHelper} from './MaxLengthHelper';

export function TextInputMaxLength<FormReturnType>(props: TextInputProps & { useFormReturn: UseFormReturnType<FormReturnType>, inputProp: keyof FormReturnType }): JSX.Element {
	const {maxLength, useFormReturn, inputProp} = props;

	const value = useFormReturn?.values[inputProp];
	if (typeof value !== 'string') {
		throw Error('Wrong component used or wrong inputProp defined.');
	}
	return (
		<TextInput {...omit(props, ['useFormReturn', 'inputProp'])}
				   {...useFormReturn?.getInputProps(inputProp)}
				   {...MaxLengthHelper(maxLength, value)}/>
	);
}
