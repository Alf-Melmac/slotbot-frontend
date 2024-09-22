import {
	ActionIcon,
	AutocompleteProps,
	Box,
	Group,
	GroupProps,
	Stack,
	TextareaProps,
	TextInputProps,
} from '@mantine/core';
import {JSX, useState} from 'react';
import {useClickOutside} from '@mantine/hooks';
import {omit} from 'lodash-es';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faPen, faXmark} from '@fortawesome/free-solid-svg-icons';

type EditableInputProps = TextInputProps | TextareaProps | AutocompleteProps;
export type InlineEditableProps<InputProps extends EditableInputProps> = InputProps & {
	position?: 'stack' | 'group';
	/**
	 * Pass wrap to the group containing the input and buttons in edit mode and the action buttons.
	 */
	wrap?: GroupProps['wrap'];
	onSubmit: () => void;
	onCancel: () => void;
	viewModeComponent: any;
	editModeComponent: any;
	editModeMaxLengthComponent?: any;
};

function filterComponentsProps<InputProps extends EditableInputProps>(props: Readonly<InlineEditableProps<InputProps>>): Omit<InputProps, 'viewModeComponent' | 'editModeComponent' | 'editModeMaxLengthComponent'> {
	return omit(props, ['viewModeComponent', 'editModeComponent', 'editModeMaxLengthComponent']);
}

export function InlineEditable<InputProps extends EditableInputProps>(props: Readonly<InlineEditableProps<InputProps>>): JSX.Element {
	const {viewModeComponent: ViewMode, onFocus, position = 'stack', wrap, onSubmit, onCancel} = props;

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

	const inputProps = omit(props, ['onSubmit', 'onCancel']);
	return <>
		{viewMode ?
			<ViewMode {...filterComponentsProps(props)}
					  onFocus={(e: any) => {
						  onFocus?.(e);
						  setViewMode(false);
					  }}
					  readOnly
					  rightSection={
						  <ActionIcon color={'gray'} variant={'subtle'} onClick={() => setViewMode(false)}>
							  <FontAwesomeIcon icon={faPen}/>
						  </ActionIcon>}
			/>
			:
			<>
				{position === 'stack' &&
                    <Stack gap={'xs'} ref={ref}>
						{/*@ts-ignore*/}
                        <EditMode {...inputProps} onSubmit={submit} onCancel={cancel}/>
                    </Stack>}

				{position === 'group' &&
                    <Group gap={'xs'} wrap={wrap} ref={ref}>
						{/*@ts-ignore*/}
                        <EditMode {...inputProps} onSubmit={submit} onCancel={cancel}/>
                    </Group>
				}
			</>
		}
	</>;
}

function EditMode<InputProps extends EditableInputProps>(props: Readonly<InlineEditableProps<InputProps>>): JSX.Element {
	const {
		position,
		wrap,
		label,
		editModeComponent: EditMode,
		maxLength,
		editModeMaxLengthComponent: EditModeMaxLength,
		onCancel,
		onSubmit,
		required,
		value,
	} = props;

	const marginTop = (position === 'group' && label) ? 25 : undefined;
	return <>
		<Box style={{flexGrow: position === 'group' ? 1 : undefined}}>
			{maxLength && EditModeMaxLength ?
				<EditModeMaxLength {...filterComponentsProps(props)} autoFocus/>
				:
				<EditMode {...filterComponentsProps(props)} autoFocus/>
			}
		</Box>
		<Group justify={'right'} gap={'xs'} wrap={wrap} mt={marginTop}>
			<ActionIcon color={'gray'} variant={'outline'} onClick={onCancel}>
				<FontAwesomeIcon icon={faXmark}/>
			</ActionIcon>
			<ActionIcon variant={'filled'} onClick={onSubmit}
						disabled={required && !value}>
				<FontAwesomeIcon icon={faCheck}/>
			</ActionIcon>
		</Group>
	</>;
}
