import {UseFormReturnType} from '@mantine/form';
import {GetInputProps} from '@mantine/form/lib/types';
import {ChangeEventHandler, ReactNode} from 'react';

function requiredField(length: number, check: () => React.ReactNode): ReactNode {
	return length < 1 ? 'Pflichtfeld' : check();
}

export function requiredFieldWithMaxLength(field: string, maxLength: number): ReactNode {
	const fieldLength = length(field);
	return requiredField(fieldLength, () => maxLengthField(field, maxLength));
}

export function maxLengthField(field: string, maxLength: number): ReactNode {
	const fieldLength = length(field);
	return validate(fieldLength > maxLength, `Nicht länger als ${maxLength} Zeichen`);
}

export function validate(check: boolean, error: string): ReactNode {
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

/**
 * Change handler to be use in onChange method after input props have been spread
 *
 * @param inputProps which includes the onChange handler for the form
 * @param callAdditionalHandler boolean to determine if optional provided changeHandler should be called
 * @param additionalChangeHandler additionally method called on change
 */
export function changeHandler(inputProps: ReturnType<GetInputProps<any>>, callAdditionalHandler: boolean, additionalChangeHandler?: () => void): ChangeEventHandler<HTMLInputElement> {
	return (event) => {
		inputProps.onChange(event);
		if (callAdditionalHandler && additionalChangeHandler) {
			additionalChangeHandler();
		}
	};
}
