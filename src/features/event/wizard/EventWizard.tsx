import {useForm} from '@mantine/form';
import {
	Autocomplete,
	Box,
	Button,
	Code,
	Container,
	Grid,
	Group,
	Select,
	Stack,
	Stepper,
	TextInput,
	Tooltip,
} from '@mantine/core';
import {Nav} from '../../../components/nav/Nav';
import {Breadcrumb} from '../../../components/Breadcrumb';
import {useState} from 'react';
import {EMBEDDABLE_DESCRIPTION, TEXT, URL} from '../../../utils/maxLength';
import {TextInputMaxLength} from '../../../components/Form/MaxLength/TextInputMaxLength';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
	faCalendarDay,
	faCircleInfo,
	faClock,
	faEye,
	faEyeSlash,
	faUsers,
	faUsersSlash,
} from '@fortawesome/free-solid-svg-icons';
import {DatePicker, TimeInput} from '@mantine/dates';
import {IconSwitch} from '../../../components/Form/IconSwitch';
import {EventTypeMask} from './EventTypeMask';
import {TextareaMaxLength} from '../../../components/Form/MaxLength/TextareaMaxLength';
import {EventPostDto} from '../eventTypes';
import {maxLengthField, requiredFieldWithMaxLength, validate} from '../../../utils/formHelper';
import {randomColor} from './EventTypeInputs';

type EventWizardProps = {};

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
						<Grid>
							<Grid.Col span={9}>
								<TextInputMaxLength label={'Titel'} placeholder={'Event Name'} maxLength={TEXT} required
													useFormReturn={form} inputProp={'name'}/>
							</Grid.Col>
							<Grid.Col span={3}>
								<Stack align={'flex-start'} spacing={'xs'}>
									<IconSwitch onIcon={faUsers} offIcon={faUsersSlash} label={
										<Group spacing={'xs'}>
											Teilen erlauben
											<Tooltip
												label={'Ermöglicht es anderen Gruppen diese Event in ihren Kalender einzufügen und darüber Teilnehmer einzutragen.'}>
												<Box>
													<FontAwesomeIcon icon={faCircleInfo}/>
												</Box>
											</Tooltip>
										</Group>
									} useFormReturn={form} inputProp={'shareable'}/>

									<IconSwitch onIcon={faEye} offIcon={faEyeSlash} label={
										<Group spacing={'xs'}>
											Sichtbarkeit
											<Tooltip
												label={'Berechtigt alle Interessierten das Event im Kalender zu sehen.'}>
												<Box>
													<FontAwesomeIcon icon={faCircleInfo}/>
												</Box>
											</Tooltip>
										</Group>
									} useFormReturn={form} inputProp={'hidden'}/>
								</Stack>
							</Grid.Col>
						</Grid>
						<Grid>
							<Grid.Col span={4}>
								<DatePicker allowFreeInput minDate={new Date()} clearable={false} required
											label={'Datum'} icon={<FontAwesomeIcon icon={faCalendarDay}/>}
											placeholder={'Event Datum'} {...form.getInputProps('date')}/>
							</Grid.Col>
							<Grid.Col span={4}>
								<TimeInput clearable={false} required label={'Startzeit'}
										   icon={<FontAwesomeIcon icon={faClock}/>} placeholder={'Event Datum'}
										   {...form.getInputProps('startTime')}/>
							</Grid.Col>
							<Grid.Col span={4}>
								<TextInputMaxLength label={'Ersteller'} maxLength={TEXT} required
													useFormReturn={form} inputProp={'creator'}/>
							</Grid.Col>
						</Grid>
						<EventTypeMask useFormReturn={form}/>
						<TextareaMaxLength label={'Beschreibung'} placeholder={'Beschreibung'} autosize minRows={3}
										   maxLength={EMBEDDABLE_DESCRIPTION}
										   useFormReturn={form} inputProp={'description'}/>
						<Grid>
							<Grid.Col span={4}>
								<Select label={'Missionstyp'} placeholder={'Auswählen...'}
										data={['COOP', 'COOP+', 'Zeus', 'TvT', 'Training', 'Spezial', 'Anderes']}
										{...form.getInputProps('missionType')}/>
							</Grid.Col>
							<Grid.Col span={4}>
								<Autocomplete label={'Missionslänge'} placeholder={'Freitext'} maxLength={TEXT}
											  data={['2 Stunden', '3 Stunden', 'über 4 Stunden']}
											  {...form.getInputProps('missionLength')}/>
							</Grid.Col>
							<Grid.Col span={4}>
								<TextInput label={'Bild-URL'} maxLength={URL} {...form.getInputProps('pictureUrl')}/>
							</Grid.Col>
						</Grid>
					</Stepper.Step>
					<Stepper.Step label={'Event'} description={'Details'}>
						Step 2
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
