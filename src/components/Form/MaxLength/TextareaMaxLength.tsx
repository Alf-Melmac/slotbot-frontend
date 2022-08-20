import {VerticalTextarea} from '../VerticalTextarea';
import {UseFormReturnType} from '@mantine/form';
import {omit} from 'lodash';
import {MaxLengthHelper} from './MaxLengthHelper';
import {TextareaProps} from '@mantine/core';

export function TextareaMaxLength<FormReturnType>(props: TextareaProps & { useFormReturn: UseFormReturnType<FormReturnType>, inputProp: keyof FormReturnType }): JSX.Element {
	const {maxLength, useFormReturn, inputProp} = props;

	const value = useFormReturn?.values[inputProp];
	if (typeof value !== 'string') {
		throw Error('Wrong component used or wrong inputProp defined.');
	}
	return (
		<VerticalTextarea {...omit(props, ['useFormReturn', 'inputProp'])}
						  {...useFormReturn?.getInputProps(inputProp)}
						  {...MaxLengthHelper(maxLength, value)}/>
	);
}
