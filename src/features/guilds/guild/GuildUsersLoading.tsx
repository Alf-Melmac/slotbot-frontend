import {T} from '../../../components/T';
import {Skeleton, Table} from '@mantine/core';

export function GuildUsersLoading(): JSX.Element {
	return <Table>
		<thead>
		<tr>
			<th><T k={'user.name'}/></th>
		</tr>
		</thead>
		<tbody>
		<tr>
			<td><Skeleton height={35}/></td>
		</tr>
		<tr>
			<td><Skeleton height={35}/></td>
		</tr>
		<tr>
			<td><Skeleton height={35}/></td>
		</tr>
		</tbody>
	</Table>;
}
