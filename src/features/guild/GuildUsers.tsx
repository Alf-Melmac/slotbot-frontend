import {useGetGuildUsers} from './useGetGuilds';
import {Avatar, Group, Skeleton, Table} from '@mantine/core';
import {GuildProps} from './Guild';
import {AnchorLink} from '../../components/Text/AnchorLink';
import {T} from '../../components/T';

export function GuildUsers(props: GuildProps): JSX.Element {
	const {guildId} = props;
	const guildUsersQuery = useGetGuildUsers(guildId);
	const guildUsers = guildUsersQuery.data;
	if (guildUsersQuery.isLoading) return <></>;

	return (
		<Table highlightOnHover>
			<thead>
			<tr>
				<th><T k={'user.name'}/></th>
			</tr>
			</thead>
			<tbody>
			{guildUsersQuery.isLoading ?
				<>
					<tr>
						<td><Skeleton height={35}/></td>
					</tr>
					<tr>
						<td><Skeleton height={35}/></td>
					</tr>
					<tr>
						<td><Skeleton height={35}/></td>
					</tr>
					<tr>
						<td><Skeleton height={35}/></td>
					</tr>
				</>
				:
				guildUsers?.map((guildUser) => (
					<tr key={guildUser.user.id}>
						<td>
							<AnchorLink to={`/profile/${guildUser.user.id}`}>
								<Group spacing={'sm'}>
									<Avatar src={guildUser.user.avatarUrl} radius={40}/>
									{guildUser.user.name}
								</Group>
							</AnchorLink>
						</td>
					</tr>
				))
			}
			</tbody>
		</Table>
	);
}
