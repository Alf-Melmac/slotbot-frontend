import {MantineReactTable, MRT_TableOptions} from 'mantine-react-table-open';
import {PartialExcept} from '../../utils/typesHelper';
import {JSX} from 'react';

/**
 * Wrapper for {@link MantineReactTable} which tries to reproduce mantines {@link Table} default styling
 */
export function MRTable<D extends Record<string, any>>(props: Readonly<PartialExcept<MRT_TableOptions<D>, 'columns' | 'data'>>): JSX.Element {
	return (
		<MantineReactTable
			enablePagination={false} enableColumnActions={false} enableSorting={false} enableTopToolbar={false}
			enableStickyHeader initialState={{density: 'xs'}} mantinePaperProps={{withBorder: false}}
			enableBottomToolbar={props.state?.showProgressBars}
			{...props}/>
	);
}
