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
import {MRT_ColumnDef, MRT_Row} from 'mantine-react-table';
import {UserInGuildDto} from '../guildTypes';
import {ReactNode, useMemo} from 'react';
import {useLanguage} from '../../../contexts/language/Language';
import {MRTable} from '../../../components/Table/MRTable';

export function GuildUsers(props: GuildProps): JSX.Element {
	const {guildId} = props;
	const guildUsersQuery = useGetGuildUsers(guildId);
	const guildUsers = guildUsersQuery.data;
	const isAdmin = useCheckAccess(ApplicationRoles.ROLE_ADMIN, guildId);
	const {t} = useLanguage();

	const columns: MRT_ColumnDef<UserInGuildDto>[] = useMemo(() => {
		const columnsDef: MRT_ColumnDef<UserInGuildDto>[] = [
			{
				accessorKey: 'user.name',
				header: t('user.name'),
				Cell: GuildUser,
			},
		];
		if (isAdmin) {
			columnsDef.push({
				id: 'guild-user-action',
				header: '',
				Cell: (props) => <GuildUserAction guildId={guildId} {...props}/>,
			});
		}
		return columnsDef;
	}, [isAdmin]);

	return <>
		{isAdmin && false && //TODO Allow member addition via web interface
            <AddButton label={'guild.user.add'} mb={'sm'} onClick={voidFunction} disabled/>}

		{guildUsersQuery.isLoading ?
			<Table>
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
			</Table>
			:
			guildUsers && <MRTable columns={columns} data={guildUsers}/>
		}
	</>;
}

type TableCellProps = {
	renderedCellValue: ReactNode;
	row: MRT_Row<UserInGuildDto>;
}

function GuildUser(props: TableCellProps): JSX.Element {
	const {renderedCellValue, row} = props;
	const {user} = row.original;

	return <AnchorLink to={`/profile/${user.id}`}>
		<Group spacing={'sm'}>
			<Avatar src={user.avatarUrl} radius={40}/>
			{renderedCellValue}
		</Group>
	</AnchorLink>;
}

function GuildUserAction(props: TableCellProps & GuildProps): JSX.Element {
	const {row, guildId} = props;
	const {user} = row.original;

	return <Group position={'right'}>
		<RemoveGuildUser guildId={guildId} userId={user.id}/>
	</Group>;
}
