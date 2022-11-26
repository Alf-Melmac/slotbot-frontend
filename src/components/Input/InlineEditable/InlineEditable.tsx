import {ActionIcon, AutocompleteProps, Box, Group, Stack, TextareaProps, TextInputProps} from '@mantine/core';
import {useState} from 'react';
import {useClickOutside} from '@mantine/hooks';
import {omit} from 'lodash';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faPen, faXmark} from '@fortawesome/free-solid-svg-icons';

type EditableInputProps = TextInputProps | TextareaProps | AutocompleteProps;
export type InlineEditableProps<InputProps extends EditableInputProps> = InputProps & {
	position?: 'stack' | 'group';
	onSubmit: () => void;
	onCancel: () => void;
	viewModeComponent: any;
	editModeComponent: any;
	editModeMaxLengthComponent?: any;
};

function filterComponentsProps<InputProps extends EditableInputProps>(props: InlineEditableProps<InputProps>): Omit<InputProps, 'viewModeComponent' | 'editModeComponent' | 'editModeMaxLengthComponent'> {
	return omit(props, ['viewModeComponent', 'editModeComponent', 'editModeMaxLengthComponent']);
}

export function InlineEditable<InputProps extends EditableInputProps>(props: InlineEditableProps<InputProps>): JSX.Element {
	const {viewModeComponent, position = 'stack', onSubmit, onCancel} = props;

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

	const ViewMode = viewModeComponent;
	const inputProps = omit(props, ['onSubmit', 'onCancel']);
	return <>
		{viewMode ?
			<ViewMode {...filterComponentsProps(props)}
					  onFocus={(e: any) => {
						  props.onFocus?.(e);
						  setViewMode(false);
					  }} readOnly rightSection={
				<ActionIcon onClick={() => setViewMode(false)}><FontAwesomeIcon icon={faPen}/></ActionIcon>}
			/>
			:
			<>
				{position === 'stack' &&
                    <Stack spacing={'xs'} ref={ref}>
						{/*@ts-ignore*/}
                        <EditMode {...inputProps} onSubmit={submit} onCancel={cancel}/>
                    </Stack>}

				{position === 'group' &&
                    <Group spacing={'xs'} ref={ref}>
						{/*@ts-ignore*/}
                        <EditMode {...inputProps} onSubmit={submit} onCancel={cancel}/>
                    </Group>
				}
			</>
		}
	</>;
}

function EditMode<InputProps extends EditableInputProps>(props: InlineEditableProps<InputProps>): JSX.Element {
	const {
		position,
		label,
		editModeComponent,
		maxLength,
		editModeMaxLengthComponent,
		onCancel,
		onSubmit,
		required,
		value,
	} = props;

	const marginTop = (position === 'group' && label) ? 25 : undefined;
	const EditMode = editModeComponent;
	const EditModeMaxLength = editModeMaxLengthComponent;
	return <>
		<Box style={{flexGrow: position === 'group' ? 1 : undefined}}>
			{maxLength && editModeMaxLengthComponent ?
				<EditModeMaxLength {...filterComponentsProps(props)} autoFocus/>
				:
				<EditMode {...filterComponentsProps(props)} autoFocus/>
			}
		</Box>
		<Group position={'right'} spacing={'xs'} mt={marginTop}>
			<ActionIcon variant={'outline'} onClick={onCancel}>
				<FontAwesomeIcon icon={faXmark}/>
			</ActionIcon>
			<ActionIcon variant={'filled'} color={'primary'} onClick={onSubmit}
						disabled={required && !value}>
				<FontAwesomeIcon icon={faCheck}/>
			</ActionIcon>
		</Group>
	</>;
}
