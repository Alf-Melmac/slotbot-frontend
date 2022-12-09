import {UseFormReturnType} from '@mantine/form';
import {ReactNode} from 'react';
import {PartialBy} from './typesHelper';
import {FrontendIdDto} from '../contexts/sharedTypes';
import {IdEntity} from '../features/event/eventTypes';
import {T} from '../components/T';

function requiredField(length: number, check: () => ReactNode): ReactNode {
	return length < 1 ? <T k={'validation.required'}/> : check();
}

export function requiredFieldWithMaxLength(field: string, maxLength: number): ReactNode {
	const fieldLength = length(field);
	return requiredField(fieldLength, () => maxLengthField(field, maxLength));
}

export function maxLengthField(field: string, maxLength: number): ReactNode {
	const fieldLength = length(field);
	return validate(fieldLength > maxLength, <T k={'validation.maxLength'} args={[maxLength]}/>);
}

export function validate(check: boolean, error: ReactNode): ReactNode {
	return check ? error : null;
}

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
