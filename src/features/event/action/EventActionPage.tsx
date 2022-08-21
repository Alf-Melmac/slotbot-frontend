import {Title, TitleProps} from '@mantine/core';
import {UseFormReturnType} from '@mantine/form';
import {EventPostDto} from '../eventTypes';
import {EventEditFormType} from '../edit/EventEditPage';

export function EventActionPageTitle(props: { children: TitleProps['children'] }): JSX.Element {
	return <Title order={2} mb={'xs'}>{props.children}</Title>;
}

export type EventActionPageProps<EventAction> = {
	form: UseFormReturnType<EventAction>;
	editMode?: boolean;
};

export type EventAction = EventPostDto | EventEditFormType;
