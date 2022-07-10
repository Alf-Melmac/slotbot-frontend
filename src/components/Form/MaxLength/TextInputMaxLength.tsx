import {TextInputProps} from '@mantine/core/lib/components/TextInput/TextInput';
import {UseFormReturnType} from '@mantine/form';
import {EventPostDto} from '../../../features/event/eventTypes';
import {TextInput} from '@mantine/core';
import {omit} from 'lodash';
import {MaxLengthHelper} from './MaxLengthHelper';

export function TextInputMaxLength(props: TextInputProps & { useFormReturn: UseFormReturnType<EventPostDto>, inputProp: keyof EventPostDto }): JSX.Element {
	const {maxLength, useFormReturn, inputProp} = props;

	const value = useFormReturn?.values[inputProp];
	if (typeof value !== 'string') {
		throw Error('Wrong component used or wrong inputProp defined.');
	}
	return (
		<TextInput {...omit(props, ['useFormReturn', 'inputProp'])}
				   {...MaxLengthHelper(maxLength, value)}
				   {...useFormReturn?.getInputProps(inputProp)}/>
	);
}
