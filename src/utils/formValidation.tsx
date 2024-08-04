import {hasLength, isNotEmpty} from '@mantine/form';
import {T} from '../components/T';

/**
 * Validates that the field {@link isNotEmpty}
 */
export function requiredField(): ReturnType<typeof isNotEmpty> {
	return isNotEmpty(<T k={'validation.required'}/>);
}

/**
 * Validates that the field {@link hasLength does not exceed} the given max length
 */
export function maxLengthField(maxLength: number): ReturnType<typeof hasLength> {
	return hasLength({max: maxLength}, <T k={'validation.maxLength'} args={[maxLength]}/>);
}

/**
 * Validates that the field {@link requiredField is not empty} and not longer than {@link maxLengthField maxLength}
 */
export function requiredFieldWithMaxLength(maxLength: number): ReturnType<typeof requiredField | typeof maxLengthField> {
	return (value: unknown) => requiredField()(value) ?? maxLengthField(maxLength)(value);
}
