import {JSX, useState} from 'react';
import {UseFormReturnType} from '@mantine/form';
import {useLanguage} from '../../../../../../contexts/language/Language';
import {ActionIcon, ComboboxItem, Group, Input, SegmentedControl, Select, TagsInput, TextInput} from '@mantine/core';
import {T} from '../../../../../../components/T';
import {EventDetailDefaultPostDto} from '../../../../../eventDetailsDefault/eventDetailsDefaultTypes';
import classes from './EventDetailDefaultForm.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {DetailDefaultFormType} from './EventDetailDefaultForm';
import {EventDetailDefaultFormTextField} from './EventDetailDefaultFormTextField';

export type EventDetailDefaultFormItemProps = {
	form: UseFormReturnType<DetailDefaultFormType>,
	index: number
};

export function EventDetailDefaultFormItem(props: Readonly<EventDetailDefaultFormItemProps>): JSX.Element {
	const {form, index} = props;

	const [showSelection, setShowSelection] = useState(form.getValues().fields[index].type === 'TEXT_WITH_SELECTION');
	const [isBooleanField, setIsBooleanField] = useState(form.getValues().fields[index].type === 'BOOLEAN');

	form.watch(`fields.${index}.type`, ({previousValue, value}) => {
		if (previousValue === 'TEXT_WITH_SELECTION') {
			form.setFieldValue(`fields.${index}.selection`, []);
		}

		setShowSelection(value === 'TEXT_WITH_SELECTION');
		const isNowBoolean = value === 'BOOLEAN';
		setIsBooleanField(isNowBoolean);
		if (isNowBoolean) {
			form.setFieldValue(`fields.${index}.text`, '');
		}
	});

	const {t} = useLanguage();
	return <>
		<Group wrap={'nowrap'}>
			<TextInput label={<T k={'event.details.default.title'}/>} required flex={1}
					   {...form.getInputProps(`fields.${index}.title`)}
					   key={form.key(`fields.${index}.title`)}/>
			<Select label={<T k={'event.details.default.type'}/>} required allowDeselect={false}
					data={[
						{
							value: 'TEXT',
							label: t('event.details.default.type.text'),
						},
						{
							value: 'TEXT_WITH_SELECTION',
							label: t('event.details.default.type.textWithSelection'),
						},
						{
							value: 'BOOLEAN',
							label: t('event.details.default.type.boolean'),
						},
					] satisfies { value: EventDetailDefaultPostDto['type'], label: ComboboxItem['label'] }[]}
					{...form.getInputProps(`fields.${index}.type`)}
					key={form.key(`fields.${index}.type`)}/>
			{isBooleanField ?
				<Input.Wrapper label={<T k={'event.details.default.standard'}/>} flex={1}
							   className={classes.segmentedControlWrapper}>
					<SegmentedControl
						data={[
							{label: <T k={'event.details.default.type.boolean.yes'}/>, value: 'true'},
							{label: <T k={'event.details.default.type.boolean.no'}/>, value: 'false'},
							{label: <T k={'event.details.default.type.boolean.none'}/>, value: ''},
						]}
						{...form.getInputProps(`fields.${index}.text`)}
						key={form.key(`fields.${index}.text`)}/>
				</Input.Wrapper>
				:
				<EventDetailDefaultFormTextField {...props}/>
			}

			<ActionIcon color={'gray'} variant={'subtle'} size={'input-md'} style={{alignSelf: 'flex-end'}}
						onClick={() => form.removeListItem('fields', index)}>
				<FontAwesomeIcon icon={faTrashCan}/>
			</ActionIcon>
		</Group>

		{showSelection &&
			<TagsInput
				label={<T k={'event.details.default.selection'}/>}
				description={<T k={'event.details.default.selection.description'}/>}
				ml={'xl'}
				required
				{...form.getInputProps(`fields.${index}.selection`)}
				key={form.key(`fields.${index}.selection`)}/>
		}
	</>;
}
