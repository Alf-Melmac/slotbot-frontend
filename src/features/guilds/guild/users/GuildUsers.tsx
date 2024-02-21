import {AddButton} from '../../../../components/Button/AddButton';
import {voidFunction} from '../../../../hooks/slotbotServerClient';
import {useGetGuildUsers} from '../useGetGuild';
import {MRT_ColumnDef, MRT_Row} from 'mantine-react-table';
import {UserInGuildDto} from '../../guildTypes';
import {JSX, ReactNode, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useLanguage} from '../../../../contexts/language/Language';
import {MRTable} from '../../../../components/Table/MRTable';
import {GuildUser} from './GuildUser';
import {RemoveGuildUser} from './RemoveGuildUser';
import {GuildUserRole} from './GuildUserRole';
import {useGuildPage} from '../../../../contexts/guild/GuildPageContext';

export function GuildUsers(): JSX.Element {
	const {guildId, isAdmin} = useGuildPage();
	const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching} = useGetGuildUsers(guildId);
	const {t} = useLanguage();

	const columns: MRT_ColumnDef<UserInGuildDto>[] = useMemo(() => {
		const columnsDef: MRT_ColumnDef<UserInGuildDto>[] = [
			{
				header: t('user.name'),
				Cell: GuildUser,
			},
			{
				header: t('user.role'),
				Cell: GuildUserRole,
			},
		];
		if (isAdmin) {
			columnsDef.push({
				id: 'guild-user-action',
				header: '',
				Cell: RemoveGuildUser,
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
			         mah: 318,
			         onScroll: (event) => fetchMoreOnBottomReached(event.target as HTMLDivElement),
		         }}
		         state={{showProgressBars: isFetching, showSkeletons: isFetching && !isFetchingNextPage}}/>
	</>;
}

export type TableCellProps = {
	renderedCellValue: ReactNode;
	row: MRT_Row<UserInGuildDto>;
}
