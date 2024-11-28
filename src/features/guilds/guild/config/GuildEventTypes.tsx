import {useGetEventTypes} from '../../../event/action/generalInformation/useGetEventTypes';
import {Badge, ColorSwatch, CopyButton, ScrollArea, Table} from '@mantine/core';
import {T} from '../../../../components/T';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCopy} from '@fortawesome/free-regular-svg-icons';
import {useGuildPage} from '../../../../contexts/guild/GuildPageContext';
import {JSX} from 'react';
import classes from './GuildEventTypes.module.css';
import {EventDetailDefault} from './eventDetailDefault/EventDetailDefault';
import {LoadingRows} from '../../../../components/Table/LoadingRows';

export function GuildEventTypes(): JSX.Element {
	const {guildId} = useGuildPage();
	const {data: eventTypes, isLoading} = useGetEventTypes(guildId);

	return <ScrollArea h={250}>
		<Table highlightOnHover stickyHeader>
			<Table.Thead>
				<Table.Tr>
					<Table.Th><T k={'color'}/></Table.Th>
					<Table.Th><T k={'name'}/></Table.Th>
					<Table.Th/>
					<Table.Th><T k={'event.details.default'}/></Table.Th>
				</Table.Tr>
			</Table.Thead>
			<Table.Tbody>
				{isLoading ?
					<LoadingRows columns={4}/>
					:
					eventTypes?.map((eventType) => (
						<Table.Tr key={eventType.name}>
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
								<EventDetailDefault name={eventType.name}/>
							</Table.Td>
						</Table.Tr>
					))
				}
			</Table.Tbody>
		</Table>
	</ScrollArea>;
}
