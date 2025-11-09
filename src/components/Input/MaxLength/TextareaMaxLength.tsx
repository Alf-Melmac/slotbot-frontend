import {MaxLengthHelper} from './MaxLengthHelper';
import {Textarea, TextareaProps} from '@mantine/core';
import {JSX} from 'react';

export function TextareaMaxLength(props: Readonly<TextareaProps>): JSX.Element {
	const {maxLength, value} = props;

	if (typeof value !== 'string') {
		throw new TypeError('Wrong component used.');
	}
	return <Textarea {...MaxLengthHelper(maxLength, value, props)}/>;
}
