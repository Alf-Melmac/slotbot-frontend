import {JSX, useState} from 'react';
import {EventTypeDto} from '../../../event/eventTypes';
import {useEventDetailsDefault} from '../../../eventDetailsDefault/useEventDetailsDefault';
import {ActionIcon, Modal} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faReceipt} from '@fortawesome/free-solid-svg-icons';
import {T} from '../../../../components/T';
import {EventDetailDefaultForm, EventDetailDefaultFormProps} from './EventDetailDefaultForm';

export type EventDetailDefaultProps = {
	name: EventTypeDto['name'];
};

export function EventDetailDefault(props: Readonly<EventDetailDefaultProps>): JSX.Element {
	const {name} = props;

	const [opened, setOpened] = useState(false);
	const closeModal = () => setOpened(false);
	return <>
		<Modal opened={opened} onClose={closeModal} title={name} size={'xl'}>
			<T k={'event.details.default.description'} args={[name]}/>

			<Form name={name} onSuccess={closeModal}/>
		</Modal>

		<ActionIcon variant={'default'} onClick={() => setOpened(true)}><FontAwesomeIcon icon={faReceipt}/></ActionIcon>
	</>;
}

function Form(props: Readonly<EventDetailDefaultProps & Pick<EventDetailDefaultFormProps, 'onSuccess'>>): JSX.Element {
	const {name, onSuccess} = props;

	const {query, defaultFields} = useEventDetailsDefault(name, false);
	if (query.isLoading) return <>Loading...</>;

	return <EventDetailDefaultForm defaultFields={defaultFields} name={name} onSuccess={onSuccess}/>;
}
