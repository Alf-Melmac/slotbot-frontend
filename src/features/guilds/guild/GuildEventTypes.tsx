import {useGetEventTypes} from '../../event/action/generalInformation/useGetEventTypes';
import {Badge, ColorSwatch, CopyButton, Table} from '@mantine/core';
import {DelayedSkeleton} from '../../../components/Delayed/DelayedSkeleton';
import {T} from '../../../components/T';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCopy} from '@fortawesome/free-regular-svg-icons';
import {useGuildPage} from '../../../contexts/guild/GuildPageContext';
import {JSX} from 'react';

export function GuildEventTypes(): JSX.Element {
	const {guildId} = useGuildPage();
	const eventTypesQuery = useGetEventTypes(guildId);
	const eventTypes = eventTypesQuery.data;

	return (
		<Table highlightOnHover>
			<thead>
			<tr>
				<th><T k={'color'}/></th>
				<th><T k={'name'}/></th>
				<th/>
			</tr>
			</thead>
			<tbody>
			{eventTypesQuery.isLoading ?
				<>
					<tr>
						<td><DelayedSkeleton height={35}/></td>
						<td><DelayedSkeleton height={35}/></td>
						<td><DelayedSkeleton height={35}/></td>
					</tr>
					<tr>
						<td><DelayedSkeleton height={35}/></td>
						<td><DelayedSkeleton height={35}/></td>
						<td><DelayedSkeleton height={35}/></td>
					</tr>
					<tr>
						<td><DelayedSkeleton height={35}/></td>
						<td><DelayedSkeleton height={35}/></td>
						<td><DelayedSkeleton height={35}/></td>
					</tr>
				</>
				:
				eventTypes?.map((eventType) => (
					<tr key={eventType.name}>
						<td>
							<CopyButton value={eventType.color}>
								{({copy, copied}) => (
									<ColorSwatch color={eventType.color} radius={'sm'} title={eventType.color}
												 onClick={copy}>
										{copied &&
                                            <FontAwesomeIcon icon={faCopy} style={{mixBlendMode: 'difference'}}/>}
									</ColorSwatch>
								)}
							</CopyButton>
						</td>
						<td>
							{eventType.name}
						</td>
						<td>
							{!eventType.guild && <Badge variant={'outline'}>Global</Badge>}
						</td>
					</tr>
				))
			}
			</tbody>
		</Table>
	);
}
