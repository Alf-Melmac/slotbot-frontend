import {useForm, UseFormReturnType} from '@mantine/form';
import {Button, Container, Group, Stepper} from '@mantine/core';
import {Nav} from '../../../components/nav/Nav';
import {Breadcrumb} from '../../../components/Breadcrumb';
import {useEffect, useState} from 'react';
import {EMBEDDABLE_DESCRIPTION, TEXT, URL} from '../../../utils/maxLength';
import {EventPostDto} from '../eventTypes';
import {maxLengthField, requiredFieldWithMaxLength, validate} from '../../../utils/formHelper';
import {randomColor} from './firstStep/EventTypeInputs';
import {EventWizardStepOne} from './firstStep/EventWizardStepOne';
import {EventWizardStepTwo} from './secondStep/EventWizardStepTwo';
import {EventWizardStepThree} from './thirdStep/EventWizardStepThree';
import {EventWizardFinish} from './EventWizardFinish';
import {useAuth} from '../../../contexts/authentication/AuthProvider';
import {PageFooter} from '../../../components/PageFooter/PageFooter';

export type EventWizardStepProps = {
	form: UseFormReturnType<EventPostDto>;
};

export function EventWizard(): JSX.Element {
	const breadcrumbItems = [
		{
			title: 'Event-Kalender',
			href: '/events',
		},
		{
			title: 'Neues Event',
		},
	];

	const date = new Date();
	date.setSeconds(0);
	const form = useForm<EventPostDto>({
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
			if (active === 0) {
				return {
					name: requiredFieldWithMaxLength(values.name.trim().length, TEXT),
					date: validate(values.date instanceof Date && values.date?.getDate() < new Date().getDate(), 'Muss in der Zukunft liegen'),
					creator: requiredFieldWithMaxLength(values.creator.trim().length, TEXT),
					'eventType.name': requiredFieldWithMaxLength(values.eventType.name.trim().length, TEXT),
					'eventType.color': validate(!/^#([a-f\d]{6}|[a-f\d]{3})$/.test(values.eventType.color), 'Muss ein HEX-Farbcode sein'),
					description: maxLengthField(values.description.trim().length, EMBEDDABLE_DESCRIPTION),
					missionType: maxLengthField(values.missionType.trim().length, TEXT),
					missionLength: maxLengthField(values.missionLength.trim().length, TEXT),
					pictureUrl: maxLengthField(values.pictureUrl.trim().length, URL),
				};
			}

			if (active === 1) {

			}

			if (active === 2) {

			}

			return {};
		},
		validateInputOnChange: ['title'],
	});

	const {user} = useAuth();
	useEffect(() => {
		if (user) {
			form.setFieldValue('creator', user.name);
		}
	}, [user]);

	const nextStep = () =>
		setActive((current) => {
			if (form.validate().hasErrors) {
				return current;
			}
			return current < 4 ? current + 1 : current;
		});

	const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

	const [active, setActive] = useState(0);
	return (
		<Nav>
			<>
				<Container>
					<Breadcrumb items={breadcrumbItems}/>

					<Stepper active={active} mt={'sm'} breakpoint={'sm'}>
						<Stepper.Step label={'Event'} description={'Allgemeine Informationen'}>
							<EventWizardStepOne form={form}/>
						</Stepper.Step>
						<Stepper.Step label={'Event'} description={'Details'}>
							<EventWizardStepTwo form={form}/>
						</Stepper.Step>
						<Stepper.Step label={'Slotliste'} description={'Teilnahmeplatzaufzählung'}>
							<EventWizardStepThree form={form}/>
						</Stepper.Step>

						<Stepper.Completed>
							<EventWizardFinish form={form}/>
						</Stepper.Completed>
					</Stepper>

					<Group position="right" mt="xl">
						{active !== 0 && active !== 3 &&
                            <Button variant="default" onClick={prevStep}>Vorherige</Button>}
						{active < 2 && <Button onClick={nextStep}>Weiter</Button>}
						{active === 2 && <Button color={'green'} onClick={nextStep}>Speichern</Button>}
					</Group>
				</Container>

				<PageFooter mt={'xl'}/>
			</>
		</Nav>
	);
}
