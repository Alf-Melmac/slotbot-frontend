import {ActionIcon, Group, Stack, TextInput, TextInputProps} from '@mantine/core';
import {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faPen, faXmark} from '@fortawesome/free-solid-svg-icons';
import {useClickOutside} from '@mantine/hooks';

interface InlineEditableProps<V = TextInputProps['value']> extends TextInputProps {
	onSubmit: () => void;
	onCancel: () => void;
}

export function InlineEditableText(props: InlineEditableProps): JSX.Element {
	const [viewMode, setViewMode] = useState(true);

	const submit = () => {
		props.onSubmit();
		setViewMode(true);
	}
	const cancel = () => {
		props.onCancel();
		setViewMode(true);
	};
	const ref = useClickOutside(cancel);

	return (
		viewMode ?
			<TextInput {...props} onFocus={() => setViewMode(false)} readOnly rightSection={
				<ActionIcon onClick={() => setViewMode(false)}><FontAwesomeIcon icon={faPen}/></ActionIcon>}
			/>
			:
			<Stack spacing={'xs'} ref={ref}>
				<TextInput {...props} autoFocus/>
				<Group position={'right'} spacing={'xs'}>
					<ActionIcon variant={'outline'} onClick={cancel}>
						<FontAwesomeIcon icon={faXmark}/>
					</ActionIcon>
					<ActionIcon variant={'filled'} color={'primary'} onClick={submit}>
						<FontAwesomeIcon icon={faCheck}/>
					</ActionIcon>
				</Group>
			</Stack>
	);
}
