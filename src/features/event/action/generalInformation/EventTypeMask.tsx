import {Grid, Skeleton} from '@mantine/core';
import {EventTypeInputs} from './EventTypeInputs';
import {useGetEventTypes} from './useGetEventTypes';
import {JSX} from 'react';

export function EventTypeMask(): JSX.Element {
	const query = useGetEventTypes();

	return <>
		{query.isLoading ?
			<Grid.Col span={12}>
				<Skeleton width={'100%'} height={60}/>
			</Grid.Col>
			:
			<EventTypeInputs query={query}/>
		}
	</>;
}
