import {Skeleton} from '@mantine/core';
import {EventTypeInputs} from './EventTypeInputs';
import {useGetEventTypes} from './useGetEventTypes';
import {JSX} from 'react';

export function EventTypeMask(): JSX.Element {
	const query = useGetEventTypes();

	return <>
		{query.isLoading ?
			<Skeleton mt={'xs'} width={'100%'} height={60}/>
			:
			<EventTypeInputs query={query}/>
		}
	</>;
}
