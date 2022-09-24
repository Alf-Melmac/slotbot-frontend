import {Title, TitleProps} from '@mantine/core';
import {UseFormReturnType} from '@mantine/form';
import {EventPostDto} from '../eventTypes';
import {EventEditFormType} from '../edit/EventEditPage';
import {WithRequired} from '../../../utils/typesHelper';

export function EventActionPageTitle(props: { children: TitleProps['children'] }): JSX.Element {
	return <Title order={2} mb={'xs'}>{props.children}</Title>;
}

export type EventActionWrapperProps<Action extends EventAction> = {
	form: UseFormReturnType<Action>;
	editMode?: boolean;
};

export type EventActionPageProps<Action extends EventAction> = WithRequired<EventActionWrapperProps<Action>, 'editMode'>;

export type EventAction = EventPostDto | EventEditFormType;
