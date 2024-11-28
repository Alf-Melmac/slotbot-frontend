import {JSX} from 'react';
import {Skeleton, Table} from '@mantine/core';

type LoadingRowsProps = {
	columns: number;
};

export function LoadingRows({columns}: Readonly<LoadingRowsProps>): JSX.Element {
	return <>{
		[...Array(3)].map((_, i) => (
			<Table.Tr key={i}>
				{[...Array(columns)].map((_, j) => (
					<Table.Td key={j}><Skeleton height={28}/></Table.Td>
				))}
			</Table.Tr>
		))
	}</>;
}
