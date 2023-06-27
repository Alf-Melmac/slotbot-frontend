import {MantineReactTable, MRT_TableOptions} from 'mantine-react-table';
import {PartialExcept} from '../../utils/typesHelper';

/**
 * Wrapper for {@link MantineReactTable} which tries to reproduce mantines {@link Table} default styling
 */
export function MRTable<D extends Record<string, any>>(props: PartialExcept<MRT_TableOptions<D>, "columns" | "data">): JSX.Element {
	return (
		<MantineReactTable
			enablePagination={false} enableColumnActions={false} enableSorting={false} enableTopToolbar={false}
			enableStickyHeader state={{density: 'xs'}} mantinePaperProps={{withBorder: false}}
			mantineTableBodyCellProps={{
				sx: {
					paddingTop: '7px !important',
					paddingBottom: '7px !important',
					backgroundColor: 'unset'
				},
			}}
			//Force progress bar size
			mantineBottomToolbarProps={{
				sx: {
					height: 8,
					minHeight: 8,
				},
			}}
			enableBottomToolbar={props.state?.showProgressBars}
			{...props}/>
	);
}
