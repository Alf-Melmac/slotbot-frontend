import {MantineReactTable, MRT_ColumnDef} from 'mantine-react-table';

type MRTableProps<D extends Record<string, any>> = {
    columns: MRT_ColumnDef<D>[];
    data: D[]
};

/**
 * Wrapper for {@link MantineReactTable} which tries to reproduce mantines {@link Table} default styling
 */
export function MRTable<D extends Record<string, any>>(props: MRTableProps<D>): JSX.Element {
    const {columns, data} = props;

    return (
        <MantineReactTable columns={columns} data={data}
                           enablePagination={false} enableColumnActions={false} enableSorting={false}
                           enableTopToolbar={false} enableBottomToolbar={false}
                           state={{density: 'xs'}} mantineTableBodyRowProps={{sx: {backgroundColor: 'unset'}}}
                           mantineTableBodyCellProps={{
                               sx: {
                                   paddingTop: '7px !important',
                                   paddingBottom: '7px !important',
                               },
                           }}
                           mantinePaperProps={{sx: {border: 'unset'}}}/>
    );
}
