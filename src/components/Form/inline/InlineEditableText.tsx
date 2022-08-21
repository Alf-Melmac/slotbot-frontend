import {ActionIcon, Group, Stack, TextInput, TextInputProps} from '@mantine/core';
import {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faPen, faXmark} from '@fortawesome/free-solid-svg-icons';
import {useClickOutside} from '@mantine/hooks';
import {TextInputMaxLength} from '../MaxLength/TextInputMaxLength';
import {omit} from 'lodash';

interface InlineEditableProps extends TextInputProps {
	position?: 'stack' | 'group';
	onSubmit: () => void;
	onCancel: () => void;
}

export function InlineEditableText(props: InlineEditableProps): JSX.Element {
	const {position = 'stack', onSubmit, onCancel} = props;

	const [viewMode, setViewMode] = useState(true);

	const submit = () => {
		onSubmit();
		setViewMode(true);
	};
	const cancel = () => {
		onCancel();
		setViewMode(true);
	};
	const ref = useClickOutside(cancel);

	const textInputProps = omit(props, ['onSubmit', 'onCancel']);
	return <>
		{viewMode ?
			<TextInput {...props} onFocus={() => setViewMode(false)} readOnly rightSection={
				<ActionIcon onClick={() => setViewMode(false)}><FontAwesomeIcon icon={faPen}/></ActionIcon>}
			/>
			:
			<>
				{position === 'stack' &&
                    <Stack spacing={'xs'} ref={ref}>
                        <EditMode {...textInputProps} onSubmit={submit} onCancel={cancel}/>
                    </Stack>}

				{position === 'group' &&
                    <Group spacing={'xs'} ref={ref} grow>
                        <EditMode {...textInputProps} onSubmit={submit} onCancel={cancel}/>
                    </Group>
				}
			</>
		}
	</>;
}

function EditMode(props: InlineEditableProps): JSX.Element {
	const textInputProps = omit(props, ['onSubmit', 'onCancel']);
	const marginTop = (props.position === 'group' && props.label) ? 25 : undefined;
	return <>
		{props.maxLength ?
			<TextInputMaxLength {...textInputProps} autoFocus/>
			:
			<TextInput {...textInputProps} autoFocus/>
		}
		<Group position={'right'} spacing={'xs'} mt={marginTop}>
			<ActionIcon variant={'outline'} onClick={props.onCancel}>
				<FontAwesomeIcon icon={faXmark}/>
			</ActionIcon>
			<ActionIcon variant={'filled'} color={'primary'} onClick={props.onSubmit}>
				<FontAwesomeIcon icon={faCheck}/>
			</ActionIcon>
		</Group>
	</>;
}
