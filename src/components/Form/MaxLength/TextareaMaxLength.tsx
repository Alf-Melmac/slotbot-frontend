import {VerticalTextarea} from '../VerticalTextarea';
import {MaxLengthHelper} from './MaxLengthHelper';
import {TextareaProps} from '@mantine/core';

export function TextareaMaxLength(props: TextareaProps): JSX.Element {
	const {maxLength, value} = props;

	if (typeof value !== 'string') {
		throw Error('Wrong component used.');
	}
	return <VerticalTextarea {...props} {...MaxLengthHelper(maxLength, value)}/>;
}
