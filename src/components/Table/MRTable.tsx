import {MantineReactTable, MantineReactTableProps} from 'mantine-react-table';
import {PartialExcept} from '../../utils/typesHelper';

/**
 * Wrapper for {@link MantineReactTable} which tries to reproduce mantines {@link Table} default styling
 */
export function MRTable<D extends Record<string, any>>(props: PartialExcept<MantineReactTableProps<D>, "columns" | "data">): JSX.Element {
	return (
		<MantineReactTable
			enablePagination={false} enableColumnActions={false} enableSorting={false}
			enableTopToolbar={false} enableBottomToolbar={false}
			state={{density: 'xs'}} mantineTableBodyRowProps={{sx: {backgroundColor: 'unset'}}}
			mantineTableBodyCellProps={{
				sx: {
					paddingTop: '7px !important',
					paddingBottom: '7px !important',
				},
			}}
			mantinePaperProps={{sx: {border: 'unset'}}}
			{...props}/>
	);
}
