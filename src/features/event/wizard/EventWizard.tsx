import {useForm} from '@mantine/form';
import {Box, Button, Code, Container, Grid, Group, Stack, Stepper, Tooltip} from '@mantine/core';
import {Nav} from '../../../components/nav/Nav';
import {Breadcrumb} from '../../../components/Breadcrumb';
import {useState} from 'react';
import {TEXT} from '../../../utils/maxLength';
import {TextInputMaxLength} from '../../../components/Form/TextInputMaxLength';
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

	const form = useForm({
		initialValues: {
			title: '',
		},
		validate: (values) => {
			if (active === 0) {
				return {
					title: values.title.length > 80 ? 'Nicht größer als 80' : null,
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

				{/*https://v5.mantine.dev/form/receipts/*/}
				<Stepper active={active} mt={'sm'} breakpoint={'sm'}>
					<Stepper.Step label={'Event'} description={'Allgemeine Informationen'}>
						<Grid>
							<Grid.Col span={9}>
								<TextInputMaxLength label={'Titel'} placeholder={'Event Name'}
													{...form.getInputProps('title')} maxLength={TEXT} required/>
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
									} defaultChecked={false}/>

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
									} defaultChecked={true}/>
								</Stack>
							</Grid.Col>
						</Grid>
						<Grid>
							<Grid.Col span={4}>
								<DatePicker allowFreeInput minDate={new Date()} clearable={false} required
											label={'Datum'} icon={<FontAwesomeIcon icon={faCalendarDay}/>} placeholder={'Event Datum'}/>
							</Grid.Col>
							<Grid.Col span={4}>
								<TimeInput required clearable={false} icon={<FontAwesomeIcon icon={faClock}/>} label={'Startzeit'}
										   placeholder={'Event Datum'}/>
							</Grid.Col>
							<Grid.Col span={4}>
								<TextInputMaxLength label={'Ersteller'} maxLength={TEXT} required/>
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
