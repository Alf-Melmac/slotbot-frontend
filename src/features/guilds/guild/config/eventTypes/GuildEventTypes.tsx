import {useGetEventTypeForGuild} from '../../../../event/action/generalInformation/useGetEventTypes';
import {ActionIcon, Badge, ColorSwatch, CopyButton, Modal, ScrollArea, Stack, Table, Tooltip} from '@mantine/core';
import {T} from '../../../../../components/T';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCopy} from '@fortawesome/free-regular-svg-icons';
import {useGuildPage} from '../../../../../contexts/guild/GuildPageContext';
import {JSX, useState} from 'react';
import classes from './GuildEventTypes.module.css';
import {EventDetailDefault} from './eventDetailDefault/EventDetailDefault';
import {LoadingRows} from '../../../../../components/Table/LoadingRows';
import {useDisclosure} from '@mantine/hooks';
import {faListCheck, faReceipt} from '@fortawesome/free-solid-svg-icons';
import {EventTypeDto} from '../../../../event/eventTypes';
import {EventDetailRequirementLists} from './requirementList/EventDetailRequirementLists';

export function GuildEventTypes(): JSX.Element {
	const {guildId} = useGuildPage();
	const {data: eventTypes, isLoading} = useGetEventTypeForGuild(guildId);

	const [selectedType, setSelectedType] = useState<string>();
	const [modalContent, setModalContent] = useState<JSX.Element>();
	const [opened, {open, close}] = useDisclosure(false);

	function openDetailsDefaultModal(type: EventTypeDto['name']) {
		setModalContent(<Stack>
			<T k={'event.details.default.description'} args={[type]}/>
			<EventDetailDefault name={type} onSuccess={closeModal}/>
		</Stack>);
		openModal(type);
	}

	function openDetailsRequirementListModal(type: EventTypeDto) {
		setModalContent(<Stack>
			<T k={'event.details.requirementList.description'}/>
			<EventDetailRequirementLists id={type.id}/>
		</Stack>);
		openModal(type.name);
	}

	function openModal(type: string) {
		setSelectedType(type);
		open();
	}

	function closeModal() {
		close();
		setSelectedType(undefined);
	}

	return <>
		<ScrollArea h={250}>
			<Table highlightOnHover stickyHeader>
				<Table.Thead>
					<Table.Tr>
						<Table.Th><T k={'color'}/></Table.Th>
						<Table.Th><T k={'name'}/></Table.Th>
						<Table.Th/>
						<Table.Th><T k={'settings'}/></Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					{isLoading ?
						<LoadingRows columns={4}/>
						:
						eventTypes?.map((eventType) => (
							<Table.Tr key={eventType.id}>
								<Table.Td>
									<CopyButton value={eventType.color}>
										{({copy, copied}) => (
											<ColorSwatch color={eventType.color} radius={'sm'} title={eventType.color}
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
									{!eventType.guild && <Badge variant={'outline'}>Global</Badge>}
								</Table.Td>
								<Table.Td>
									<ActionIcon.Group>
										<Tooltip label={<T k={'event.details.default'}/>}>
											<ActionIcon variant={'default'}
														onClick={() => openDetailsDefaultModal(eventType.name)}>
												<FontAwesomeIcon icon={faReceipt}/>
											</ActionIcon>
										</Tooltip>
										<Tooltip label={<T k={'event.details.requirementList'}/>}>
											<ActionIcon variant={'default'} disabled={!eventType.guild}
														onClick={() => openDetailsRequirementListModal(eventType)}>
												<FontAwesomeIcon icon={faListCheck}/>
											</ActionIcon>
										</Tooltip>
									</ActionIcon.Group>
								</Table.Td>
							</Table.Tr>
						))
					}
				</Table.Tbody>
			</Table>
		</ScrollArea>

		<Modal opened={opened} onClose={closeModal} title={selectedType} size={'xl'}>
			{modalContent}
		</Modal>
	</>;
}
