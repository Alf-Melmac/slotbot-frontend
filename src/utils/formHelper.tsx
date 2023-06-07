import {UseFormReturnType} from '@mantine/form';
import {ReactNode} from 'react';
import {PartialBy} from './typesHelper';
import {FrontendIdDto} from '../contexts/sharedTypes';
import {IdEntity} from '../features/event/eventTypes';
import {T} from '../components/T';
import {URL} from './maxLength';

/**
 * Validates that the field is not empty
 */
function requiredField(length: number, check: () => ReactNode): ReactNode {
	return validateChain(length < 1, <T k={'validation.required'}/>, check);
}

/**
 * Validates that the field is not empty and not longer than maxLength
 */
export function requiredFieldWithMaxLength(field: string, maxLength: number): ReactNode {
	const fieldLength = length(field);
	return requiredField(fieldLength, () => maxLengthField(field, maxLength));
}

/**
 * Validates that the field is not longer than maxLength
 */
export function maxLengthField(field: string, maxLength: number): ReactNode {
	const fieldLength = length(field);
	return validate(fieldLength > maxLength, <T k={'validation.maxLength'} args={[maxLength]}/>);
}

/**
 * Validates that the field contains a valid hex color
 */
export function colorField(field: string): ReactNode {
	return validate(!/^#([a-f\d]{3}){1,2}$/.test(field), <T k={'validation.hexColor'}/>);
}

/**
 * Validates that the field contains a valid url
 */
export function urlField(field: string): ReactNode {
	return field !== '' && validateChain(!/^(https?|attachment):\/\/\S+$/.test(field), <T k={'validation.url'}/>,
		() => maxLengthField(field, URL));
}

export function validate(check: boolean, error: ReactNode): ReactNode {
	return check ? error : null;
}

function validateChain(check: boolean, error: ReactNode, check2: () => ReactNode): ReactNode {
	return check ? error : check2();
}

/**
 * Returns the length of the string after trimming it
 */
export function length(s: string) {
	return s ? s.trim().length : 0;
}

/**
 * Workaround method if the path is too complex to be used by direct access to `form.values`
 */
export function getFormFieldValue(form: UseFormReturnType<any>, path: string) {
	return form.getInputProps(path).value;
}

export type FilteredEventAction<Field extends FrontendIdDto | IdEntity> = PartialBy<Field, 'id'>

export function filterFrontendIds<Field extends FrontendIdDto | IdEntity>(list: FilteredEventAction<Field>[]): FilteredEventAction<Field>[] {
	const newList: FilteredEventAction<Field>[] = structuredClone(list);
	removeFrontendIds(newList);
	return newList;
}

function removeFrontendIds(list: any[]): void {
	list.forEach(field => {
		const id = field.id;
		if (typeof id === 'string' && id.startsWith('mantine-')) {
			delete field.id;
		}
		for (const value of Object.values(field)) {
			if (Array.isArray(value)) {
				removeFrontendIds(value);
			}
		}
	});
}
