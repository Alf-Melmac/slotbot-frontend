import {useForm, UseFormReturnType} from '@mantine/form';
import {Button, Code, Container, Group, Stepper} from '@mantine/core';
import {Nav} from '../../../components/nav/Nav';
import {Breadcrumb} from '../../../components/Breadcrumb';
import {useState} from 'react';
import {EMBEDDABLE_DESCRIPTION, TEXT, URL} from '../../../utils/maxLength';
import {EventPostDto} from '../eventTypes';
import {maxLengthField, requiredFieldWithMaxLength, validate} from '../../../utils/formHelper';
import {randomColor} from './EventTypeInputs';
import {EventWizardStepOne} from './EventWizardStepOne';
import {EventWizardStepTwo} from './EventWizardStepTwo';

type EventWizardProps = {};
export type EventWizardStepProps = {
	form: UseFormReturnType<EventPostDto>;
};

export function EventWizard(props: EventWizardProps): JSX.Element {
	const {} = props;

	const breadcrumbItems = [
		{
			title: 'Event-Kalender',
			href: '/events',
		},
		{
			title: 'Neues Event',
		},
	];

	/*const getEvents = () => slotbotServerClient.get(`http://localhost:8090/events/test`).then((res) => res.data);
	const query = useQuery<EventDetailsDto, Error>('event', getEvents);
	const event = query.data;*/

	const form = useForm<EventPostDto>({
		initialValues: {
			hidden: false,
			shareable: true,
			name: '',
			date: new Date(),
			startTime: new Date(),
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
		},
		validate: (values) => {
			console.log(values);
			console.log(active);
			if (active === 0) {
				return {
					name: requiredFieldWithMaxLength(values.name.trim().length, TEXT),
					date: validate(values.date?.getDate() < new Date().getDate(), 'Muss in der Zukunft liegen'),
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

	const nextStep = () =>
		setActive((current) => {
			if (form.validate().hasErrors) {
				return current;
			}
			return current < 3 ? current + 1 : current;
		});

	const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

	const [active, setActive] = useState(0);
	return (
		<Nav>
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
						Step 3
					</Stepper.Step>

					<Stepper.Completed>
						Completed! Form values:
						<Code block mt="xl">
							{JSON.stringify(form.values, null, 2)}
						</Code>
					</Stepper.Completed>
				</Stepper>

				<Group position="right" mt="xl">
					{active !== 0 && (
						<Button variant="default" onClick={prevStep}>
							Vorherige
						</Button>
					)}
					{active !== 3 && <Button onClick={nextStep}>Weiter</Button>}
				</Group>

				<div>
					Moin!
					{/*{event?.name}*/}
				</div>
			</Container>
		</Nav>
	);
}
