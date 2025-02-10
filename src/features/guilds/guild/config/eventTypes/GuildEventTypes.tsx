import {useGetEventTypeForGuild} from '../../../../event/action/generalInformation/useGetEventTypes';
import {ActionIcon, ColorSwatch, CopyButton, ScrollArea, Stack, Table, Tooltip} from '@mantine/core';
import {T} from '../../../../../components/T';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCopy} from '@fortawesome/free-regular-svg-icons';
import {useGuildPage} from '../../../../../contexts/guild/GuildPageContext';
import {JSX} from 'react';
import classes from './GuildEventTypes.module.css';
import {EventDetailDefault} from './eventDetailDefault/EventDetailDefault';
import {LoadingRows} from '../../../../../components/Table/LoadingRows';
import {faListCheck, faReceipt} from '@fortawesome/free-solid-svg-icons';
import {EventDetailRequirementLists} from './requirementList/EventDetailRequirementLists';
import {FeatureFlag} from '../../../../featureFlag/useGetFeatureFlags';
import {RequireFeatureFlag} from '../../../../featureFlag/RequireFeatureFlag';
import {SharedModal} from '../../../../../components/SharedModal';

export function GuildEventTypes(): JSX.Element {
	const {guildId} = useGuildPage();
	const {data: eventTypes, isLoading} = useGetEventTypeForGuild(guildId);

	return <SharedModal size={'xl'}>
		{(openModal, closeModal) =>
			<ScrollArea h={250}>
				<Table highlightOnHover stickyHeader>
					<Table.Thead>
						<Table.Tr>
							<Table.Th><T k={'color'}/></Table.Th>
							<Table.Th><T k={'name'}/></Table.Th>
							<Table.Th><T k={'settings'}/></Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{isLoading ?
							<LoadingRows columns={3}/>
							:
							eventTypes?.map((eventType) => (
								<Table.Tr key={eventType.id}>
									<Table.Td>
										<CopyButton value={eventType.color}>
											{({copy, copied}) => (
												<ColorSwatch color={eventType.color} radius={'sm'}
															 title={eventType.color}
															 onClick={copy}
															 classNames={{childrenOverlay: classes.eventTypeColorSwatch}}>
													{copied && <FontAwesomeIcon icon={faCopy}/>}
												</ColorSwatch>
											)}
										</CopyButton>
									</Table.Td>
									<Table.Td>
										{eventType.name}
									</Table.Td>
									<Table.Td>
										<ActionIcon.Group>
											<Tooltip label={<T k={'event.details.default'}/>}>
												<ActionIcon variant={'default'}
															onClick={() => openModal(
																eventType.name,
																<Stack>
																	<T k={'event.details.default.description'}
																	   args={[eventType.name]}/>
																	<EventDetailDefault id={eventType.id}
																						onSuccess={closeModal}/>
																</Stack>,
															)}>
													<FontAwesomeIcon icon={faReceipt}/>
												</ActionIcon>
											</Tooltip>
											<RequireFeatureFlag feature={FeatureFlag.REQUIREMENTS}>
												<Tooltip label={<T k={'event.details.requirementList'}/>}>
													<ActionIcon variant={'default'} disabled={!eventType.guild}
																onClick={() => openModal(
																	eventType.name,
																	<Stack>
																		<T k={'event.details.requirementList.description'}/>
																		<EventDetailRequirementLists id={eventType.id}/>
																	</Stack>,
																)}>
														<FontAwesomeIcon icon={faListCheck}/>
													</ActionIcon>
												</Tooltip>
											</RequireFeatureFlag>
										</ActionIcon.Group>
									</Table.Td>
								</Table.Tr>
							))
						}
					</Table.Tbody>
				</Table>
			</ScrollArea>
		}
	</SharedModal>;
}
