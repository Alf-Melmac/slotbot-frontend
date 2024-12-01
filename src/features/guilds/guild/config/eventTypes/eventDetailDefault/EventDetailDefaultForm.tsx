import {Fragment, JSX, useState} from 'react';
import {EventDetailDefaultDto, EventDetailType} from '../../../../../eventDetailsDefault/eventDetailsDefaultTypes';
import {EventDetailDefaultProps} from './EventDetailDefault';
import {useForm} from '@mantine/form';
import {maxLengthField, requiredField, requiredFieldWithMaxLength} from '../../../../../../utils/formValidation';
import {EMBEDDABLE_TITLE, EMBEDDABLE_VALUE} from '../../../../../../utils/maxLength';
import {filterFrontendIds} from '../../../../../../utils/formHelper';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import slotbotServerClient from '../../../../../../hooks/slotbotServerClient';
import {AxiosError} from 'axios';
import {successNotification} from '../../../../../../utils/notificationHelper';
import {
	ActionIcon,
	Button,
	ComboboxItem,
	Group,
	Input,
	SegmentedControl,
	Select,
	Stack,
	TagsInput,
	TextInput,
} from '@mantine/core';
import {AddButton} from '../../../../../../components/Button/AddButton';
import {randomId} from '@mantine/hooks';
import {MAX_DETAILS} from '../../../../../event/action/details/EventDetails';
import {CounterBadge} from '../../../../../../components/Form/CounterBadge';
import {T} from '../../../../../../components/T';
import {useLanguage} from '../../../../../../contexts/language/Language';
import classes from './EventDetailDefaultForm.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {useGuildPage} from '../../../../../../contexts/guild/GuildPageContext';

type EventDetailDefaultFormProps = {
	defaultFields: EventDetailDefaultDto[] | undefined;
} & EventDetailDefaultProps;

type DetailDefaultFormType = {
	fields: EventDetailDefaultDto[]
};

export function EventDetailDefaultForm(props: Readonly<EventDetailDefaultFormProps>): JSX.Element {
	const {defaultFields, name, onSuccess} = props;

	const form = useForm<DetailDefaultFormType>({
		mode: 'uncontrolled',
		validateInputOnChange: true,
		initialValues: {
			fields: defaultFields ?? [],
		},
		validate: {
			fields: {
				title: requiredFieldWithMaxLength(EMBEDDABLE_TITLE),
				text: maxLengthField(EMBEDDABLE_VALUE),
				selection: (value, values, path) => {
					//path is fields.INDEX.selection
					const index = Number(path.split('.').at(-2));
					if (values.fields[index].type === 'TEXT_WITH_SELECTION') {
						return requiredField()(value);
					}
					return null;
				},
			},
		},
		transformValues: (values) => ({
			fields: filterFrontendIds<EventDetailDefaultDto>(values.fields) as EventDetailDefaultDto[],
		}),
	});

	const detailsCount = form.getValues().fields.length;

	const {guildId} = useGuildPage();
	const queryClient = useQueryClient();
	const putEventFieldDefaults = (details: EventDetailDefaultDto[]) => slotbotServerClient
		.put(`/events/details/defaults/${guildId}`,
			details,
			{params: {eventTypeName: name}})
		.then((res) => res.data);
	const {mutate} = useMutation<EventDetailDefaultDto[], AxiosError, EventDetailDefaultDto[]>({
		mutationFn: putEventFieldDefaults,
		onSuccess: (data) => {
			onSuccess();
			successNotification();
			queryClient.setQueryData(['field-defaults', name], () => data);
		},
	});

	return <form onSubmit={form.onSubmit((values) => mutate(values.fields))}>
		<Stack>
			{form.getValues().fields.map((field, index) => (
				<Fragment key={field.id}>
					<OneDefault form={form} index={index}/>
				</Fragment>
			))}

			<Group gap={'xs'} mt={'xs'}>
				<AddButton label={'event.details.add'}
						   onClick={() => form.insertListItem('fields', {
							   id: randomId(),
							   title: '',
							   type: 'TEXT',
							   text: '',
						   } as EventDetailDefaultDto)}
						   disabled={detailsCount >= MAX_DETAILS}/>
				<CounterBadge currentValue={detailsCount} maxValue={MAX_DETAILS} yellowPhase/>
			</Group>

			<Button type={'submit'} disabled={!form.isDirty() || !form.isValid()}><T k={'action.save'}/></Button>
		</Stack>
	</form>;
}

function OneDefault(props: Readonly<{
	form: ReturnType<typeof useForm<DetailDefaultFormType>>,
	index: number
}>): JSX.Element {
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
					] satisfies { value: EventDetailType, label: ComboboxItem['label'] }[]}
					{...form.getInputProps(`fields.${index}.type`)}
					key={form.key(`fields.${index}.type`)}/>
			{isBooleanField ?
				<Input.Wrapper label={<T k={'event.details.default.standard'}/>} flex={1}
							   className={classes.segmentedControlWrapper}>
					<SegmentedControl data={[
						{label: <T k={'event.details.default.type.boolean.yes'}/>, value: 'true'},
						{label: <T k={'event.details.default.type.boolean.no'}/>, value: 'false'},
						{label: <T k={'event.details.default.type.boolean.none'}/>, value: ''},
					]}
									  {...form.getInputProps(`fields.${index}.text`)}
									  key={form.key(`fields.${index}.text`)}/>
				</Input.Wrapper>
				:
				<TextInput label={<T k={'event.details.default.standard'}/>} flex={1}
						   {...form.getInputProps(`fields.${index}.text`)}
						   key={form.key(`fields.${index}.text`)}/>
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
