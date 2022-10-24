import {Button, Code, Container, Group, Stepper} from '@mantine/core';
import {Nav} from '../../../components/nav/Nav';
import {Breadcrumb} from '../../../components/Breadcrumb';
import {useEffect, useState} from 'react';
import {EventDetailsDto, EventPostDto} from '../eventTypes';
import {randomColor} from '../action/generalInformation/EventTypeInputs';
import {EventWizardFinish} from './EventWizardFinish';
import {useAuth} from '../../../contexts/authentication/AuthProvider';
import {PageFooter} from '../../../components/PageFooter/PageFooter';
import {useLocation} from 'react-router-dom';
import slotbotServerClient from '../../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';
import {omit} from 'lodash';
import {randomId, useDocumentTitle} from '@mantine/hooks';
import {EventGeneralInformation} from '../action/generalInformation/EventGeneralInformation';
import {EventDetailsPage} from '../action/details/EventDetailsPage';
import {EventSlotlist} from '../action/slotlist/EventSlotlist';
import {eventActionValidate} from '../action/validation';
import {EventWizardProvider, useEventWizardForm} from '../../../contexts/event/action/EventActionFormContext';

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

	const nextStep = () =>
		setActive((current) => {
			if (form.validate().hasErrors) {
				return current;
			}
			return current < 4 ? current + 1 : current;
		});
	const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

	const state = useLocation().state as EventWizardLocation | null;
	const copyEvent = state?.copy;
	const getEventForCopy = () => slotbotServerClient.get(`/events/${copyEvent}/copy`).then((res) => res.data);
	useQuery<EventPostDto, Error>(['copyEvent', copyEvent], getEventForCopy, {
		enabled: !!copyEvent,
		onSuccess: data => {
			data.details.forEach(field => field.id = randomId());
			data.squadList.forEach(squad => {
				squad.id = randomId();
				squad.slotList.forEach(slot => slot.id = randomId());
			});
			form.setValues(omit(data, ['date', 'startTime']) as EventPostDto);
		},
	});

	const {user} = useAuth();
	useEffect(() => {
		if (user && !copyEvent) {
			form.setFieldValue('creator', user.name);
		}
	}, [user]);

	return (
		<Nav>
			<>
				<Container>
					<EventWizardProvider form={form}>
						<Breadcrumb items={breadcrumbItems}/>

						<Stepper active={active} mt={'sm'} breakpoint={'sm'}>
							<Stepper.Step label={'Event'} description={'Allgemeine Informationen'}>
								<EventGeneralInformation/>
							</Stepper.Step>
							<Stepper.Step label={'Event'} description={'Details'}>
								<EventDetailsPage/>
							</Stepper.Step>
							<Stepper.Step label={'Slotliste'} description={'Teilnahmeplatzaufzählung'}>
								<EventSlotlist/>
							</Stepper.Step>

							<Stepper.Completed>
								<EventWizardFinish/>
							</Stepper.Completed>
						</Stepper>

						<Group position="right" mt="xl">
							{active !== 0 && active !== 3 &&
                                <Button variant="default" onClick={prevStep}>Vorherige</Button>}
							{active < 2 && <Button onClick={nextStep}>Weiter</Button>}
							{active === 2 && <Button color={'green'} onClick={nextStep}>Speichern</Button>}
						</Group>
					</EventWizardProvider>
				</Container>

				<PageFooter mt={'xl'}/>
			</>
		</Nav>
	);
}
