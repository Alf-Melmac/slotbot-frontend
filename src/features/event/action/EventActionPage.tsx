import {Title} from '@mantine/core';
import {EventPostDto} from '../eventTypes';
import {EventEditFormType} from '../edit/EventEditPage';
import {TextKey} from '../../../contexts/language/Language';
import {T} from '../../../components/T';

export function EventActionPageTitle(props: { title: TextKey }): JSX.Element {
	return <Title order={2} mb={'xs'}><T k={props.title}/></Title>;
}

export type EventAction = EventPostDto | EventEditFormType;
