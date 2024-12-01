import {JSX, useState} from 'react';
import {useGuildPage} from '../../../../../contexts/guild/GuildPageContext';
import slotbotServerClient from '../../../../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';
import {RequirementListDto, RequirementListPostDto} from './requirementTypes';
import {ActionIcon, Avatar, Checkbox, Modal, ScrollArea, Table, Tooltip} from '@mantine/core';
import {T} from '../../../../../components/T';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPen, faPuzzlePiece} from '@fortawesome/free-solid-svg-icons';
import {AddButton} from '../../../../../components/Button/AddButton';
import {useDisclosure} from '@mantine/hooks';
import {RequirementListForm} from './RequirementListForm';
import {LoadingRows} from '../../../../../components/Table/LoadingRows';

export function GuildRequirementList(): JSX.Element {
	const {guildId} = useGuildPage();

	const getGuildRequirementLists = () => slotbotServerClient.get(`/requirement-list/${guildId}`).then(res => res.data);
	const {data, isLoading} = useQuery<RequirementListDto[], Error>({
		queryKey: ['requirementLists', guildId],
		queryFn: getGuildRequirementLists,
	});

	const [modal, setModal] = useState<RequirementListPostDto | undefined>(undefined);
	const [opened, {open, close}] = useDisclosure(false);

	function openModal(list?: RequirementListDto) {
		setModal(list as RequirementListPostDto | undefined);
		open();
	}

	function closeModal() {
		close();
		setModal(undefined);
	}

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
									<Tooltip label={<T k={'action.edit'}/>}>
										<ActionIcon variant={'default'} onClick={() => openModal(list)}>
											<FontAwesomeIcon icon={faPen}/>
										</ActionIcon>
									</Tooltip>
								</Table.Td>
							</Table.Tr>
						))
					}
				</Table.Tbody>
			</Table>
		</ScrollArea>

		<AddButton label={'guild.requirementList.new'} onClick={() => openModal()}/>

		<Modal opened={opened} onClose={closeModal} title={<T k={'guild.requirementList.new'}/>} size={'xl'}>
			<RequirementListForm list={modal} onSuccess={closeModal}/>
		</Modal>
	</>;
}

export function Requirements({requirements}: Readonly<{ requirements: RequirementListDto['requirements'] }>): JSX.Element {
	return <Avatar.Group>
		{requirements.slice(0, 4).map((requirement, index) => (
			<Tooltip
				key={requirement.id}
				label={index < 3 ?
					requirement.name :
					requirements.slice(3).map(requirement => <div key={requirement.id}>{requirement.name}</div>)}
				withArrow
			>
				<Avatar src={requirement.icon}>
					{index < 3 ? <FontAwesomeIcon icon={faPuzzlePiece}/> : `+${requirements.length - 3}`}
				</Avatar>
			</Tooltip>
		))}
	</Avatar.Group>;
}
