import {PartialBy} from '../../../utils/typesHelper';
import {InlineEditable, InlineEditableProps} from './InlineEditable';
import {Autocomplete, AutocompleteProps, Textarea, TextareaProps, TextInput, TextInputProps} from '@mantine/core';
import {TextInputMaxLength} from '../MaxLength/TextInputMaxLength';
import {VerticalTextarea} from '../VerticalTextarea';
import {TextareaMaxLength} from '../MaxLength/TextareaMaxLength';
import {TextInputAndUpload} from '../TextInputAndUpload';
import {TextInputAndUploadMaxLength} from '../MaxLength/TextInputAndUploadMaxLength';
import {JSX} from 'react';

type InlineEditableTextProps = PartialBy<InlineEditableProps<TextInputProps>, 'viewModeComponent' | 'editModeComponent'>;

export function InlineEditableText(props: Readonly<InlineEditableTextProps>): JSX.Element {
	return <InlineEditable viewModeComponent={TextInput}
						   editModeComponent={TextInput} editModeMaxLengthComponent={TextInputMaxLength}
						   {...props}/>;
}

export function InlineEditableTextAndUpload(props: Readonly<InlineEditableTextProps>): JSX.Element {
	return <InlineEditable viewModeComponent={TextInput}
						   editModeComponent={TextInputAndUpload}
						   editModeMaxLengthComponent={TextInputAndUploadMaxLength}
						   {...props}/>;
}

type InlineEditableTextareaProps = PartialBy<InlineEditableProps<TextareaProps>, 'viewModeComponent' | 'editModeComponent'>;

export function InlineEditableTextarea(props: Readonly<InlineEditableTextareaProps>): JSX.Element {
	return <InlineEditable viewModeComponent={Textarea}
						   editModeComponent={VerticalTextarea} editModeMaxLengthComponent={TextareaMaxLength}
						   {...props}/>;
}

type InlineEditableAutocompleteProps = PartialBy<InlineEditableProps<AutocompleteProps>, 'viewModeComponent' | 'editModeComponent'>;

export function InlineEditableAutocomplete(props: Readonly<InlineEditableAutocompleteProps>): JSX.Element {
	return <InlineEditable viewModeComponent={Autocomplete} editModeComponent={Autocomplete} {...props}/>;
}
