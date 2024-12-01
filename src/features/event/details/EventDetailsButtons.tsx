import {JSX, useState} from 'react';
import {EventDetailsDto} from '../eventTypes';
import {useCheckAccess} from '../../../contexts/authentication/useCheckAccess';
import {ApplicationRoles} from '../../../contexts/authentication/authenticationTypes';
import {Button, Checkbox, Group, Modal, Stack} from '@mantine/core';
import {EventDetailsButton, EventDetailsLinkButton} from './EventDetailsButton';
import {faClone, faEdit, faTrashCan} from '@fortawesome/free-regular-svg-icons';
import {EventWizardLocation} from '../wizard/EventWizard';
import {T} from '../../../components/T';
import {useDisclosure} from '@mantine/hooks';
import slotbotServerClient, {voidFunction} from '../../../hooks/slotbotServerClient';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {useNavigate} from 'react-router';
import {useGuildContext} from '../../../contexts/guildcontext/GuildContext';

type EventDetailsButtonsProps = {
	eventId: EventDetailsDto['id'];
	ownerGuildIdentifier: EventDetailsDto['ownerGuildIdentifier'];
};

export function EventDetailsButtons(props: Readonly<EventDetailsButtonsProps>): JSX.Element {
	const {eventId, ownerGuildIdentifier} = props;

	const eventManage = useCheckAccess(ApplicationRoles.ROLE_EVENT_MANAGE, undefined, eventId);
	const admin = useCheckAccess(ApplicationRoles.ROLE_ADMIN, undefined, props.eventId);

	if (!eventManage && !admin) return <></>;

	return <Group gap={'xs'}>
		{eventManage && <>
            <EventDetailsLinkButton icon={faClone}
                                    to={`/events/${ownerGuildIdentifier}/new`} state={{copy: props.eventId} as EventWizardLocation}
                                    tooltip={'action.duplicate'}/>
            <EventDetailsLinkButton icon={faEdit} to={`/events/${props.eventId}/edit`} tooltip={'action.edit'}/>
        </>}
		{admin && <EventDeletion eventId={eventId}/>}
	</Group>;
}

function EventDeletion(props: Readonly<Pick<EventDetailsButtonsProps, 'eventId'>>): JSX.Element {
	const {guildUrlPath} = useGuildContext();
	const [opened, {open, close}] = useDisclosure(false);
	const [checked, setChecked] = useState(false);

	const deleteEvent = () => slotbotServerClient.delete(`/events/${props.eventId}`).then(voidFunction);
	const navigate = useNavigate();
	const {mutate, isPending} = useMutation<void, AxiosError>({
		mutationFn: deleteEvent,
		onSuccess: () => {
			navigate(`/events/calendar${guildUrlPath}`);
		},
	});

	function closeAndReset() {
		close();
		setChecked(false);
	}
	return <>
		<EventDetailsButton icon={faTrashCan} onClick={open} tooltip={'action.delete'}/>

		<Modal opened={opened} onClose={closeAndReset} size={'lg'} title={<T k={'event.delete'}/>}>
			<Stack>
				<T k={'event.delete.description'}/>
				<Checkbox
					checked={checked}
					onChange={(event) => setChecked(event.currentTarget.checked)}
					required
					label={<T k={'event.delete.confirm'}/>}
					color={'red'}
				/>
				<Group justify={'flex-end'}>
					<Button variant={'default'} onClick={closeAndReset}><T k={'action.cancel'}/></Button>
					<Button color={'red'} disabled={!checked || isPending} onClick={() => mutate()}>
						<T k={'action.delete'}/>
					</Button>
				</Group>
			</Stack>
		</Modal>
	</>;
}
