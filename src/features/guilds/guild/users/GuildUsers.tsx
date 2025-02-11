import {AddButton} from '../../../../components/Button/AddButton';
import {voidFunction} from '../../../../hooks/slotbotServerClient';
import {useGetGuildUsers} from '../useGetGuild';
import {MRT_ColumnDef, MRT_Row} from 'mantine-react-table';
import {UserInGuildDto} from '../../guildTypes';
import {JSX, lazy, ReactNode, Suspense, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useLanguage} from '../../../../contexts/language/Language';
import {MRTable} from '../../../../components/Table/MRTable';
import {GuildUserCell} from './GuildUser';
import {GuildUserRole} from './GuildUserRole';
import {useGuildPage} from '../../../../contexts/guild/GuildPageContext';
import {SharedModal, SharedModalChild} from '../../../../components/SharedModal';

export type TableCellProps = {
	renderedCellValue: ReactNode;
	row: MRT_Row<UserInGuildDto>;
}

export function GuildUsers(): JSX.Element {
	const {isAdmin} = useGuildPage();

	return <>
		{isAdmin && false && //TODO Allow member addition via web interface
            <AddButton label={'guild.user.add'} mb={'sm'} onClick={voidFunction} disabled/>}

		<SharedModal>
			{(openModal, closeModal) =>
				<GuildUsersTable openModal={openModal} closeModal={closeModal}/>
			}
		</SharedModal>
	</>;
}

function GuildUsersTable({openModal, closeModal}: Readonly<SharedModalChild>): JSX.Element {
	const {guildId, isAdmin} = useGuildPage();
	const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching} = useGetGuildUsers(guildId);
	const {t} = useLanguage();

	const columns: MRT_ColumnDef<UserInGuildDto>[] = useMemo(() => {
		const columnsDef: MRT_ColumnDef<UserInGuildDto>[] = [
			{
				header: t('user.name'),
				Cell: GuildUserCell,
			},
			{
				header: t('user.role'),
				Cell: GuildUserRole,
			},
		];
		if (isAdmin) {
			const GuildUserActions = lazy(() => import('./actions/GuildUserActions'));
			columnsDef.push({
				id: 'guild-user-action',
				header: '',
				Cell: (cellProps: TableCellProps) => <Suspense fallback={<></>}>
					<GuildUserActions {...cellProps} openModal={openModal} closeModal={closeModal}/>
				</Suspense>,
			});
		}
		return columnsDef;
	}, [isAdmin, openModal, closeModal]);

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

	return <MRTable columns={columns} data={flatData}
					localization={{noRecordsToDisplay: t('guild.users.none')}}
					mantineTableContainerProps={{
						ref: tableContainerRef,
						style: {maxHeight: '550px'},
						onScroll: (event) => fetchMoreOnBottomReached(event.target as HTMLDivElement),
					}}
					state={{showProgressBars: isFetching, showSkeletons: isFetching && !isFetchingNextPage}}/>;
}
