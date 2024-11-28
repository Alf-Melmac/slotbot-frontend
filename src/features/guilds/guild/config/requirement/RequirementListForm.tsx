import {JSX} from 'react';
import {useForm} from '@mantine/form';
import {RequirementListDto, RequirementListPostDto} from './requirementTypes';
import {randomId, useUncontrolled} from '@mantine/hooks';
import {requiredField} from '../../../../../utils/formValidation';
import {useGuildPage} from '../../../../../contexts/guild/GuildPageContext';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import slotbotServerClient from '../../../../../hooks/slotbotServerClient';
import {useLanguage} from '../../../../../contexts/language/Language';
import {
	ActionIcon,
	Avatar,
	Button,
	Checkbox,
	Divider,
	FileInput,
	Group,
	Stack,
	TextInput,
	Tooltip,
} from '@mantine/core';
import {T} from '../../../../../components/T';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faImage, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {AddButton} from '../../../../../components/Button/AddButton';
import {removeFrontendIdsFromElement} from '../../../../../utils/formHelper';

type RequirementListFormProps = {
	list: RequirementListPostDto | undefined;
	onSuccess: () => void;
}

export function RequirementListForm(props: Readonly<RequirementListFormProps>): JSX.Element {
	const {
		onSuccess,
		list = {
			id: randomId(),
			name: '',
			requirements: [
				{
					id: randomId(),
					name: '',
				},
			],
			memberAssignable: true,
			enforced: false,
		} as RequirementListPostDto,
	} = props;

	const editMode = !!props.list;

	const form = useForm<RequirementListPostDto>({
		mode: 'uncontrolled',
		validateInputOnChange: true,
		initialValues: list,
		validate: {
			name: requiredField(),
			requirements: {
				name: requiredField(),
			},
		},
		transformValues: removeFrontendIdsFromElement,
	});

	const {guildId} = useGuildPage();
	const queryClient = useQueryClient();
	const putRequirementList = (list: RequirementListPostDto) => slotbotServerClient
		.put(`/requirement-list/${guildId}`, list)
		.then((res) => res.data);
	const {mutate} = useMutation<RequirementListDto, Error, RequirementListPostDto>({
		mutationFn: putRequirementList,
		onSuccess: (data) => {
			onSuccess();
			if (editMode) {
				queryClient.setQueryData(['requirementLists', guildId], (lists: RequirementListDto[]) => {
					const index = lists.findIndex((l) => l.id === data.id);
					const newLists = [...lists];
					newLists[index] = data;
					return newLists;
				});
			} else {
				queryClient.setQueryData(['requirementLists', guildId], (lists: RequirementListDto[]) => {
					return [...lists, data];
				});
			}
		},
	});

	const {t} = useLanguage();
	return <form onSubmit={form.onSubmit((values) => mutate(values))}>
		<Stack>
			<TextInput label={<T k={'name'}/>} placeholder={t('guild.requirementList.name')} required
					   {...form.getInputProps('name')} key={form.key('name')}/>
			<Group>
				<Tooltip label={<T k={'guild.requirementList.memberAssignable.tooltip'}/>} refProp={'rootRef'}>
					<Checkbox label={<T k={'guild.requirementList.memberAssignable'}/>}
							  {...form.getInputProps('memberAssignable', {type: 'checkbox'})}
							  key={form.key('memberAssignable')}/>
				</Tooltip>
				{/*'guild.requirementList.enforced.tooltip'*/}
				<Tooltip label={<T k={'featurePreview.disabledDuringPreview'}/>} refProp={'rootRef'}>
					<Checkbox disabled
							  label={<T k={'guild.requirementList.enforced'}/>}
							  {...form.getInputProps('enforced', {type: 'checkbox'})}
							  key={form.key('enforced')}/>
				</Tooltip>
			</Group>
			<Divider/>

			<Stack gap={'xs'}>
				{form.getValues().requirements.map((requirement, index) => (
					<Group key={requirement.id} wrap={'nowrap'}>
						<IconUploadFormInput
							{...form.getInputProps(`requirements.${index}.icon`)}
							key={form.key(`requirements.${index}.icon`)}
						/>
						<TextInput label={<T k={'name'}/>} required flex={1}
								   {...form.getInputProps(`requirements.${index}.name`)}
								   key={form.key(`requirements.${index}.name`)}/>

						<ActionIcon color={'gray'} variant={'subtle'} size={'input-md'} style={{alignSelf: 'flex-end'}}
									onClick={() => form.removeListItem('requirements', index)}>
							<FontAwesomeIcon icon={faTrashCan}/>
						</ActionIcon>
					</Group>
				))}

				<AddButton label={'event.details.add'} onClick={() => form.insertListItem('requirements', {
					id: randomId(),
					name: '',
				})}/>
			</Stack>

			<Button type={'submit'} disabled={!form.isDirty() || !form.isValid()} style={{alignSelf: 'end'}}><T
				k={'action.save'}/></Button>
		</Stack>
	</form>;
}

type IconUploadFormInputProps = {
	value?: File | null;
	defaultValue?: File;
	onChange?: (value: File | null) => void;
}

function IconUploadFormInput(props: Readonly<IconUploadFormInputProps>): JSX.Element {
	const {value, defaultValue, onChange} = props;

	const [_value, handleChange] = useUncontrolled({
		value,
		defaultValue,
		finalValue: null,
		onChange,
	});

	return <Tooltip label={<T k={'featurePreview.disabledDuringPreview'}/>}>
		<FileInput disabled
				   accept={'image/*'} label={<T k={'icon'}/>}
				   value={_value}
				   placeholder={<FontAwesomeIcon icon={faImage}/>}
				   valueComponent={({value}) => {
					   if (value === null || Array.isArray(value)) return null;
					   return <Avatar size={'sm'} src={URL.createObjectURL(value)}/>;
				   }}
				   onChange={file => handleChange(file)}
				   clearable/>
	</Tooltip>;
}
