import {MantineReactTable, MRT_TableOptions} from 'mantine-react-table';
import {PartialExcept} from '../../utils/typesHelper';
import {JSX} from 'react';
import classes from './MRTable.module.css';

/**
 * Wrapper for {@link MantineReactTable} which tries to reproduce mantines {@link Table} default styling
 */
export function MRTable<D extends Record<string, any>>(props: Readonly<PartialExcept<MRT_TableOptions<D>, 'columns' | 'data'>>): JSX.Element {
	return (
		<MantineReactTable
			enablePagination={false} enableColumnActions={false} enableSorting={false} enableTopToolbar={false}
			enableStickyHeader state={{density: 'xs'}} mantinePaperProps={{withBorder: false}}
			mantineTableBodyCellProps={{className: classes.bodyCell}}
			//Force progress bar size
			mantineBottomToolbarProps={{className: classes.bottomToolbar}}
			enableBottomToolbar={props.state?.showProgressBars}
			{...props}/>
	);
}
