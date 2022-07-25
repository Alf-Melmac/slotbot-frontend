import {VerticalTextarea} from '../VerticalTextarea';
import {UseFormReturnType} from '@mantine/form';
import {EventPostDto} from '../../../features/event/eventTypes';
import {omit} from 'lodash';
import {MaxLengthHelper} from './MaxLengthHelper';
import {TextareaProps} from '@mantine/core';

export function TextareaMaxLength(props: TextareaProps & { useFormReturn: UseFormReturnType<EventPostDto>, inputProp: keyof EventPostDto }): JSX.Element {
	const {maxLength, useFormReturn, inputProp} = props;

	const value = useFormReturn?.values[inputProp];
	if (typeof value !== 'string') {
		throw Error('Wrong component used or wrong inputProp defined.');
	}
	return (
		<VerticalTextarea {...omit(props, ['useFormReturn', 'inputProp'])}
						  {...MaxLengthHelper(maxLength, value)}
						  {...useFormReturn?.getInputProps(inputProp)}/>
	);
}
