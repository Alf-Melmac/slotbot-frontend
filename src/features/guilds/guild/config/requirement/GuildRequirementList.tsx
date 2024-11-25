import {JSX, useState} from 'react';
import {useGuildPage} from '../../../../../contexts/guild/GuildPageContext';
import slotbotServerClient from '../../../../../hooks/slotbotServerClient';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {RequirementListDto, RequirementListPostDto} from './requirementTypes';
import {
	ActionIcon,
	Avatar,
	Button,
	Checkbox,
	Divider,
	FileInput,
	Group,
	Modal,
	ScrollArea,
	Skeleton,
	Stack,
	Table,
	TextInput,
	Tooltip,
} from '@mantine/core';
import {T} from '../../../../../components/T';
import {AddButton} from '../../../../../components/Button/AddButton';
import {useForm} from '@mantine/form';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faImage, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {randomId, useUncontrolled} from '@mantine/hooks';
import {useLanguage} from '../../../../../contexts/language/Language';
import {requiredField} from '../../../../../utils/formValidation';

export function GuildRequirementList(): JSX.Element {
	const {guildId} = useGuildPage();

	const getGuildRequirementLists = () => slotbotServerClient.get(`/requirement-list/${guildId}`).then(res => res.data);
	const {data, isLoading} = useQuery<RequirementListDto[], Error>({
		queryKey: ['requirementLists', guildId],
		queryFn: getGuildRequirementLists,
	});

	return <>
		<ScrollArea h={250}>
			<Table highlightOnHover stickyHeader>
				<Table.Thead>
					<Table.Tr>
						<Table.Th><T k={'guild.requirementList.name'}/></Table.Th>
						<Table.Th><T k={'guild.requirementList.memberAssignable'}/></Table.Th>
						<Table.Th><T k={'guild.requirementList.enforced'}/></Table.Th>
						<Table.Th></Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					{isLoading ?
						<>{
							[...Array(3)].map((_, i) => (
								<Table.Tr key={i}>
									<Table.Td><Skeleton height={28}/></Table.Td>
									<Table.Td><Skeleton height={28}/></Table.Td>
									<Table.Td><Skeleton height={28}/></Table.Td>
									<Table.Td><Skeleton height={28}/></Table.Td>
								</Table.Tr>
							))
						}</>
						:
						data?.map((list) => (
							<Table.Tr key={list.id}>
								<Table.Td>
									{list.name}
								</Table.Td>
								<Table.Td>
									<Checkbox.Indicator checked={list.memberAssignable}/>
								</Table.Td>
								<Table.Td>
									<Checkbox.Indicator checked={list.enforced}/>
								</Table.Td>
								<Table.Td>
									{list.requirements.length}
								</Table.Td>
							</Table.Tr>
						))
					}
				</Table.Tbody>
			</Table>
		</ScrollArea>

		<AddRequirement/>
	</>;
}

function AddRequirement(): JSX.Element {
	const [opened, setOpened] = useState(false);
	const closeModal = () => setOpened(false);
	return <>
		<Modal opened={opened} onClose={closeModal} title={<T k={'guild.requirementList.new'}/>} size={'xl'}>
			<RequirementListForm onSuccess={closeModal}/>
		</Modal>

		<AddButton label={'guild.requirementList.new'} onClick={() => setOpened(true)}/>
	</>;
}

type RequirementListFormProps = {
	onSuccess: () => void;
}

function RequirementListForm(props: Readonly<RequirementListFormProps>): JSX.Element {
	const {onSuccess} = props;

	const form = useForm<RequirementListPostDto>({
		mode: 'uncontrolled',
		validateInputOnChange: true,
		initialValues: {
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
		},
		validate: {
			name: requiredField(),
			requirements: {
				name: requiredField(),
			},
		},
	});

	const {guildId} = useGuildPage();
	const queryClient = useQueryClient();
	const postRequirementList = (list: RequirementListPostDto) => slotbotServerClient
		.post(`/requirement-list/${guildId}`, list)
		.then((res) => res.data);
	const {mutate} = useMutation<RequirementListDto, Error, RequirementListPostDto>({
		mutationFn: postRequirementList,
		onSuccess: (data) => {
			onSuccess();
			queryClient.invalidateQueries({queryKey: ['requirementLists', guildId]});
			// queryClient.setQueryData(['requirementLists', guildId], () => data);
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
				<Tooltip label={<T k={'guild.requirementList.enforced.tooltip'}/>} refProp={'rootRef'}>
					<Checkbox label={<T k={'guild.requirementList.enforced'}/>}
							  {...form.getInputProps('enforced', {type: 'checkbox'})}
							  key={form.key('enforced')}/>
				</Tooltip>
			</Group>
			<Divider/>

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

	return <FileInput accept={'image/*'} label={<T k={'icon'}/>}
					  value={_value}
					  placeholder={<FontAwesomeIcon icon={faImage}/>}
					  valueComponent={({value}) => {
						  if (value === null || Array.isArray(value)) return null;
						  return <Avatar size={'sm'} src={URL.createObjectURL(value)}/>;
					  }}
					  onChange={file => handleChange(file)}
					  clearable/>;
}
