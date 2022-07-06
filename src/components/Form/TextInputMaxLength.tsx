import {Badge, TextInput} from '@mantine/core';
import {TextInputProps} from '@mantine/core/lib/components/TextInput/TextInput';
import {useState} from 'react';

export function TextInputMaxLength(props: TextInputProps): JSX.Element {
	const {maxLength} = props;

	const [value, setValue] = useState("");
	const [showRightSection, setShowRightSection] = useState(false);
	const badgeColor = maxLength === value.length ? 'red' : undefined;

	return (
		<TextInput {...props}
				   value={value}
				   maxLength={maxLength}
				   onChange={(e) => setValue(e.currentTarget.value)}
				   rightSection={
					   showRightSection ? <Badge color={badgeColor}>{value.length}/{maxLength}</Badge> : null
				   } rightSectionWidth={60}
				   onFocus={() => setShowRightSection(true)}
				   onBlur={() => setShowRightSection(false)}/>
	);
}
