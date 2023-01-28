import {Avatar, Group, Skeleton, Table} from '@mantine/core';
import {GuildProps} from './Guild';
import {AnchorLink} from '../../../components/Text/AnchorLink';
import {T} from '../../../components/T';
import {useCheckAccess} from '../../../contexts/authentication/useCheckAccess';
import {ApplicationRoles} from '../../../contexts/authentication/authenticationTypes';
import {AddButton} from '../../../components/Button/AddButton';
import {voidFunction} from '../../../hooks/slotbotServerClient';
import {useGetGuildUsers} from './useGetGuild';
import {RemoveGuildUser} from './RemoveGuildUser';

export function GuildUsers(props: GuildProps): JSX.Element {
	const {guildId} = props;
	const guildUsersQuery = useGetGuildUsers(guildId);
	const guildUsers = guildUsersQuery.data;
	const isAdmin = useCheckAccess(ApplicationRoles.ROLE_ADMIN, guildId);
	if (guildUsersQuery.isLoading) return <></>;

	return <>
		{isAdmin && false && //TODO Allow member addition via web interface
            <AddButton label={'guild.user.add'} mb={'sm'} onClick={voidFunction} disabled/>
		}

		<Table highlightOnHover>
			<thead>
			<tr>
				<th><T k={'user.name'}/></th>
				<th/>
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
						<td>
							<Group position={'right'}>
								{isAdmin &&
                                    <RemoveGuildUser guildId={guildId} userId={guildUser.user.id}/>
								}
							</Group>
						</td>
					</tr>
				))
			}
			</tbody>
		</Table>
	</>;
}
