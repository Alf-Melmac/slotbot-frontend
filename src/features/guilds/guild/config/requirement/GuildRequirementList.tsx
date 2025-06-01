import {JSX} from 'react';
import {useGuildPage} from '../../../../../contexts/guild/GuildPageContext';
import slotbotServerClient from '../../../../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';
import {RequirementListDto, RequirementListPostDto} from './requirementTypes';
import {ActionIcon, Checkbox, Modal, ScrollArea, Table, ThemeIcon, Tooltip} from '@mantine/core';
import {T} from '../../../../../components/T';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPen, faRobot, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {AddButton} from '../../../../../components/Button/AddButton';
import {RequirementListForm} from './RequirementListForm';
import {LoadingRows} from '../../../../../components/Table/LoadingRows';
import {Requirements} from '../../../../requirements/Requirements';
import {RequirementListDeletion} from './RequirementListDeletion';
import {useDisclosure} from '@mantine/hooks';

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
						<Table.Th><T k={'guild.requirementList'}/></Table.Th>
						<Table.Th></Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					{isLoading ?
						<LoadingRows columns={5}/>
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
									<Requirements requirements={list.requirements}/>
								</Table.Td>
								<Table.Td>
									{list.global ?
										<Tooltip label={<T k={'guild.requirementList.global'}/>}>
											<ThemeIcon variant={'transparent'} color={'gray'}>
												<FontAwesomeIcon icon={faRobot}/>
											</ThemeIcon>
										</Tooltip>
										:
										<ActionIcon.Group>
											<EditRequirementList list={list as unknown as RequirementListPostDto}/>
											<DeleteRequirementList list={list}/>
										</ActionIcon.Group>
									}
								</Table.Td>
							</Table.Tr>
						))
					}
				</Table.Tbody>
			</Table>
		</ScrollArea>

		<NewRequirementList/>
	</>;
}

function NewRequirementList(): JSX.Element {
	const [opened, {open, close}] = useDisclosure(false);

	return <>
		<AddButton label={'guild.requirementList.new'} onClick={open}/>

		<Modal opened={opened} onClose={close} title={<T k={'guild.requirementList.new'}/>} size={'xl'}>
			<RequirementListForm onSuccess={close}/>
		</Modal>
	</>;
}

function EditRequirementList({list}: Readonly<{ list: RequirementListPostDto }>): JSX.Element {
	const [opened, {open, close}] = useDisclosure(false);

	return <>
		<Tooltip label={<T k={'action.edit'}/>}>
			<ActionIcon variant={'default'} onClick={open}>
				<FontAwesomeIcon icon={faPen}/>
			</ActionIcon>
		</Tooltip>

		<Modal opened={opened} onClose={close} title={<T k={'guild.requirementList.edit'}/>} size={'xl'}>
			<RequirementListForm list={list as unknown as RequirementListPostDto} onSuccess={close}/>
		</Modal>
	</>;
}

function DeleteRequirementList({list}: Readonly<{ list: RequirementListDto }>): JSX.Element {
	const [opened, {open, close}] = useDisclosure(false);

	return <>
		<Tooltip label={<T k={'action.delete'}/>}>
			<ActionIcon variant={'default'} onClick={open}>
				<FontAwesomeIcon icon={faTrashCan}/>
			</ActionIcon>
		</Tooltip>

		<Modal opened={opened} onClose={close} title={<T k={'action.delete.item'} args={[list.name]}/>} size={'xl'}>
			<RequirementListDeletion id={list.id} closeModal={close}/>
		</Modal>
	</>;
}
