import {JSX} from 'react';
import {useGuildPage} from '../../../../../contexts/guild/GuildPageContext';
import slotbotServerClient from '../../../../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';
import {RequirementListDto, RequirementListPostDto} from './requirementTypes';
import {ActionIcon, Checkbox, ScrollArea, Table, ThemeIcon, Tooltip} from '@mantine/core';
import {T} from '../../../../../components/T';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPen, faRobot, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {AddButton} from '../../../../../components/Button/AddButton';
import {RequirementListForm} from './RequirementListForm';
import {LoadingRows} from '../../../../../components/Table/LoadingRows';
import {Requirements} from '../../../../requirements/Requirements';
import {SharedModal} from '../../../../../components/SharedModal';
import {RequirementListDeletion} from './RequirementListDeletion';

export function GuildRequirementList(): JSX.Element {
	const {guildId} = useGuildPage();

	const getGuildRequirementLists = () => slotbotServerClient.get(`/requirement-list/${guildId}`).then(res => res.data);
	const {data, isLoading} = useQuery<RequirementListDto[], Error>({
		queryKey: ['requirementLists', guildId],
		queryFn: getGuildRequirementLists,
	});

	return <SharedModal size={'xl'}>
		{(openModal, closeModal) =>
			<>
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
													<Tooltip label={<T k={'action.edit'}/>}>
														<ActionIcon variant={'default'} onClick={() => openModal(
															<T k={'guild.requirementList.new'}/>,
															<RequirementListForm
																list={list as unknown as RequirementListPostDto}
																onSuccess={closeModal}/>,
														)}>
															<FontAwesomeIcon icon={faPen}/>
														</ActionIcon>
													</Tooltip>
													<Tooltip label={<T k={'action.delete'}/>}>
														<ActionIcon variant={'default'} onClick={() => openModal(
															<T k={'action.delete.item'} args={[list.name]}/>,
															<RequirementListDeletion id={list.id}
																					 closeModal={closeModal}/>,
														)}>
															<FontAwesomeIcon icon={faTrashCan}/>
														</ActionIcon>
													</Tooltip>
												</ActionIcon.Group>
											}
										</Table.Td>
									</Table.Tr>
								))
							}
						</Table.Tbody>
					</Table>
				</ScrollArea>

				<AddButton label={'guild.requirementList.new'} onClick={() => openModal(
					<T k={'guild.requirementList.new'}/>,
					<RequirementListForm onSuccess={closeModal}/>,
				)}/>
			</>
		}
	</SharedModal>;
}
