import {useGetEventTypeForGuild} from '../../../../event/action/generalInformation/useGetEventTypes';
import {ActionIcon, ColorSwatch, CopyButton, Modal, ScrollArea, Stack, Table, Tooltip} from '@mantine/core';
import {T} from '../../../../../components/T';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCopy} from '@fortawesome/free-regular-svg-icons';
import {useGuildPage} from '../../../../../contexts/guild/GuildPageContext';
import {JSX} from 'react';
import classes from './GuildEventTypes.module.css';
import {LoadingRows} from '../../../../../components/Table/LoadingRows';
import {faListCheck, faReceipt} from '@fortawesome/free-solid-svg-icons';
import {EventDetailRequirementLists} from './requirementList/EventDetailRequirementLists';
import {FeatureFlag} from '../../../../featureFlag/useGetFeatureFlags';
import {RequireFeatureFlag} from '../../../../featureFlag/RequireFeatureFlag';
import {useDisclosure} from '@mantine/hooks';
import {EventTypeDto} from '../../../../event/eventTypes';
import {EventDetailDefaultForm} from './eventDetailDefault/EventDetailDefaultForm';

export function GuildEventTypes(): JSX.Element {
	const {guildId} = useGuildPage();
	const {data: eventTypes, isLoading} = useGetEventTypeForGuild(guildId);

	return <ScrollArea h={250}>
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
									<EventDetailDefault id={eventType.id} name={eventType.name}/>
									<RequireFeatureFlag feature={FeatureFlag.REQUIREMENTS}>
										<EventDetailRequirements id={eventType.id} name={eventType.name}
																 guild={eventType.guild}/>
									</RequireFeatureFlag>
								</ActionIcon.Group>
							</Table.Td>
						</Table.Tr>
					))
				}
			</Table.Tbody>
		</Table>
	</ScrollArea>;
}

function EventDetailDefault({id, name}: Readonly<Pick<EventTypeDto, 'id' | 'name'>>): JSX.Element {
	const [opened, {open, close}] = useDisclosure(false);

	return <>
		<Tooltip label={<T k={'event.details.default'}/>}>
			<ActionIcon variant={'default'} onClick={open}>
				<FontAwesomeIcon icon={faReceipt}/>
			</ActionIcon>
		</Tooltip>

		<Modal opened={opened} onClose={close} title={name} size={'xl'}>
			<Stack>
				<T k={'event.details.default.description'} args={[name]}/>
				<EventDetailDefaultForm id={id} onSuccess={close}/>
			</Stack>
		</Modal>
	</>;
}

function EventDetailRequirements(props: Readonly<Pick<EventTypeDto, 'id' | 'name' | 'guild'>>): JSX.Element {
	const {id, name, guild} = props;
	const [opened, {open, close}] = useDisclosure(false);

	return <>
		<Tooltip label={<T k={'event.details.requirementList'}/>}>
			<ActionIcon variant={'default'} disabled={!guild} onClick={open}>
				<FontAwesomeIcon icon={faListCheck}/>
			</ActionIcon>
		</Tooltip>

		<Modal opened={opened} onClose={close} title={name} size={'xl'}>
			<Stack>
				<T k={'event.details.requirementList.description'}/>
				<EventDetailRequirementLists id={id}/>
			</Stack>
		</Modal>
	</>;
}
