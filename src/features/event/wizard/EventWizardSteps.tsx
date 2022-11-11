import {Button, Group, Stepper} from '@mantine/core';
import {EventGeneralInformation} from '../action/generalInformation/EventGeneralInformation';
import {EventDetailsPage} from '../action/details/EventDetailsPage';
import {EventSlotlist} from '../action/slotlist/EventSlotlist';
import {useEventSave} from './useEventSave';
import {Dispatch, SetStateAction} from 'react';
import {useFormContext} from '../../../contexts/event/action/EventActionFormContext';

type EventWizardStepsProps = {
	active: number;
	setActive: Dispatch<SetStateAction<number>>;
};

export function EventWizardSteps(props: EventWizardStepsProps): JSX.Element {
	const {active, setActive} = props;
	const form = useFormContext();

	const nextStep = () =>
		setActive((current) => {
			if (form.validate().hasErrors) {
				return current;
			}
			return current < 4 ? current + 1 : current;
		});
	const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

	const {mutate, eventWizardFinish} = useEventSave();

	return <>
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
				{eventWizardFinish}
			</Stepper.Completed>
		</Stepper>

		<Group position="right" mt="xl">
			{active !== 0 && active !== 3 &&
                <Button variant="default" onClick={prevStep}>Vorherige</Button>}
			{active < 2 && <Button onClick={nextStep}>Weiter</Button>}
			{active === 2 && <Button color={'green'} onClick={() => {
				nextStep();
				mutate();
			}}>Speichern</Button>}
		</Group>
	</>;
}
