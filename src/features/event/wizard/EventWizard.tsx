import {FormErrors} from '@mantine/form';
import {Button, Container, Group, Stepper} from '@mantine/core';
import {Nav} from '../../../components/nav/Nav';
import {Breadcrumb} from '../../../components/Breadcrumb';
import {useEffect, useState} from 'react';
import {EMBEDDABLE_DESCRIPTION, EMBEDDABLE_TITLE, EMBEDDABLE_VALUE, TEXT, URL} from '../../../utils/maxLength';
import {EventDetailsDto, EventPostDto} from '../eventTypes';
import {maxLengthField, requiredFieldWithMaxLength, validate} from '../../../utils/formHelper';
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
import {validateEmbedSize, validateSquadList} from './validation';
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
		validate: (values) => {
			let errors: FormErrors = {};
			if (active === 0) {
				errors = {
					name: requiredFieldWithMaxLength(values.name, TEXT),
					date: validate(values.date instanceof Date && values.date?.getDate() < new Date().getDate(), 'Muss in der Zukunft liegen'),
					creator: requiredFieldWithMaxLength(values.creator, TEXT),
					'eventType.name': requiredFieldWithMaxLength(values.eventType.name, TEXT),
					'eventType.color': validate(!/^#([a-f\d]{6}|[a-f\d]{3})$/.test(values.eventType.color), 'Muss ein HEX-Farbcode sein'),
					description: maxLengthField(values.description, EMBEDDABLE_DESCRIPTION),
					missionType: maxLengthField(values.missionType, TEXT),
					missionLength: maxLengthField(values.missionLength, TEXT),
					pictureUrl: maxLengthField(values.pictureUrl, URL),
				};
				validateEmbedSize(values, errors);
			}

			if (active === 1) {
				values.details.forEach((field, i) => {
					errors[`details.${i}.title`] = requiredFieldWithMaxLength(field.title, EMBEDDABLE_TITLE);
					errors[`details.${i}.text`] = requiredFieldWithMaxLength(field.text, EMBEDDABLE_VALUE);
				});
				validateEmbedSize(values, errors);
			}

			if (active === 2) {
				validateSquadList(values, errors);
			}

			return errors;
		},
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
