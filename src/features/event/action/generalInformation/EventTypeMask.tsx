import {Skeleton} from '@mantine/core';
import {EventTypeInputs} from './EventTypeInputs';
import {useGetEventTypes} from './useGetEventTypes';
import {JSX} from 'react';
import {EventEditDto} from '../../eventTypes';

export type EventTypeMaskProps = Partial<Pick<EventEditDto, 'ownerGuild'>>;

export function EventTypeMask(props: Readonly<EventTypeMaskProps>): JSX.Element {
	const query = useGetEventTypes(props.ownerGuild);

	return <>
		{query.isLoading ?
			<Skeleton mt={'xs'} width={'100%'} height={60}/>
			:
			<EventTypeInputs query={query}/>
		}
	</>;
}
