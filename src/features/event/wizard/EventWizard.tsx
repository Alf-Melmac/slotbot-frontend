import {Container} from '@mantine/core';
import {Nav} from '../../../components/nav/Nav';
import {Breadcrumb} from '../../../components/Breadcrumb';
import {useEffect, useState} from 'react';
import {EventDetailsDto} from '../eventTypes';
import {randomColor} from '../action/generalInformation/EventTypeInputs';
import {useAuth} from '../../../contexts/authentication/AuthProvider';
import {useDocumentTitle} from '@mantine/hooks';
import {eventActionValidate} from '../action/validation';
import {EventWizardProvider, useEventWizardForm} from '../../../contexts/event/action/EventActionFormContext';
import {EventWizardSteps} from './EventWizardSteps';
import {useEventCopy} from './useEventCopy';

export type EventWizardLocation = {
	copy: EventDetailsDto['id'];
}

export function EventWizard(): JSX.Element {
	useDocumentTitle('Neues Event');
	const breadcrumbItems = [
		{
			title: 'Event-Kalender',
			href: '/events',
		},
		{
			title: 'Neues Event',
		},
	];

	const [active, setActive] = useState(0);

	const date = new Date();
	date.setSeconds(0);
	const form = useEventWizardForm({
		initialValues: {
			hidden: false,
			shareable: true,
			name: '',
			date: date,
			startTime: date,
			creator: '',
			eventType: {
				name: '',
				color: randomColor(),
			},
			description: '',
			missionType: '',
			missionLength: '',
			pictureUrl: '',
			details: [],
			squadList: [],
			reserveParticipating: undefined,
		},
		validate: (values) => eventActionValidate(values, active),
		//Works only on first page as no state can be used inside on change validation (https://discord.com/channels/854810300876062770/1026255061241839627)
		validateInputOnChange: ['name', 'date', 'creator', 'eventType', 'description', 'missionType', 'missionLength', 'pictureUrl'],
		validateInputOnBlur: true,
	});

	const {copyEvent} = useEventCopy(form);

	const {user} = useAuth();
	useEffect(() => {
		if (user && !copyEvent) {
			form.setFieldValue('creator', user.name);
		}
	}, [user]);

	return (
		<Nav>
			<Container>
				<EventWizardProvider form={form}>
					<Breadcrumb items={breadcrumbItems}/>

					<EventWizardSteps active={active} setActive={setActive}/>
				</EventWizardProvider>
			</Container>
		</Nav>
	);
}
