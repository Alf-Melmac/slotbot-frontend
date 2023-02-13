import {useGetEventTypes} from '../../event/action/generalInformation/useGetEventTypes';
import {GuildProps} from './Guild';
import {Badge, ColorSwatch, Table} from '@mantine/core';
import {DelayedSkeleton} from '../../../components/DelayedSkeleton';
import {T} from '../../../components/T';

export function GuildEventTypes(props: GuildProps): JSX.Element {
	const {guildId} = props;

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
							<ColorSwatch color={eventType.color} radius={'sm'}/>
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
