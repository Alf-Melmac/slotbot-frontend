import {Avatar, Group} from '@mantine/core';
import {GuildProps} from './Guild';
import {AnchorLink} from '../../../components/Text/AnchorLink';
import {useCheckAccess} from '../../../contexts/authentication/useCheckAccess';
import {ApplicationRoles} from '../../../contexts/authentication/authenticationTypes';
import {AddButton} from '../../../components/Button/AddButton';
import {voidFunction} from '../../../hooks/slotbotServerClient';
import {useGetGuildUsers} from './useGetGuild';
import {RemoveGuildUser} from './RemoveGuildUser';
import {MRT_ColumnDef, MRT_Row} from 'mantine-react-table';
import {UserInGuildDto} from '../guildTypes';
import {ReactNode, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useLanguage} from '../../../contexts/language/Language';
import {MRTable} from '../../../components/Table/MRTable';

export function GuildUsers(props: GuildProps): JSX.Element {
	const {guildId} = props;
	const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching} = useGetGuildUsers(guildId);
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

	const [flatData, setFlatData] = useState<UserInGuildDto[]>([]);
	useEffect(() => {
		setFlatData(data?.pages.flatMap((page) => page.content) ?? []);
	}, [data]);

	const fetchMoreOnBottomReached = useCallback((containerRefElement: HTMLDivElement | null) => {
		if (containerRefElement) {
			const {scrollHeight, scrollTop, clientHeight} = containerRefElement;
			//If there is more data, load it as soon as the user scrolls closer than 200px to the bottom of the table
			if (scrollHeight - scrollTop - clientHeight < 200 && !isFetching && hasNextPage) {
				fetchNextPage();
			}
		}
	}, [fetchNextPage, isFetching, hasNextPage]);

	const tableContainerRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		fetchMoreOnBottomReached(tableContainerRef.current);
	}, [fetchMoreOnBottomReached]); //Initial load

	return <>
		{isAdmin && false && //TODO Allow member addition via web interface
            <AddButton label={'guild.user.add'} mb={'sm'} onClick={voidFunction} disabled/>}

		<MRTable columns={columns} data={flatData}
				 localization={{noRecordsToDisplay: t('guild.users.none')}}
				 mantineTableContainerProps={{
					 ref: tableContainerRef,
					 sx: {maxHeight: '318px'},
					 onScroll: (event) => fetchMoreOnBottomReached(event.target as HTMLDivElement),
				 }}
				 state={{showProgressBars: isFetching, showSkeletons: isFetching && !isFetchingNextPage}}/>
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
