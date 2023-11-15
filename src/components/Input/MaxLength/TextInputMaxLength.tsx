import {TextInput, TextInputProps} from '@mantine/core';
import {MaxLengthHelper} from './MaxLengthHelper';
import {JSX} from 'react';

export function TextInputMaxLength(props: Readonly<TextInputProps>): JSX.Element {
	const {maxLength, value} = props;

	if (typeof value !== 'string') {
		throw Error('Wrong component used.');
	}
	return <TextInput {...MaxLengthHelper(maxLength, value, props)}/>;
}
