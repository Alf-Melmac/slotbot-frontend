import {Button, Group, Stepper} from '@mantine/core';
import {EventGeneralInformation} from '../action/generalInformation/EventGeneralInformation';
import {EventDetailsPage} from '../action/details/EventDetailsPage';
import {EventSlotlist} from '../action/slotlist/EventSlotlist';
import {useEventSave} from './useEventSave';
import {Dispatch, JSX, SetStateAction} from 'react';
import {useFormContext} from '../../../contexts/event/action/EventActionFormContext';
import {T} from '../../../components/T';
import {useIsMobile} from '../../../hooks/isMobile';
import {EventDescriptionsForWizard} from './EventDescriptionsForWizard';

type EventWizardStepsProps = {
	active: number;
	setActive: Dispatch<SetStateAction<number>>;
};

const WIZARD_STEPS_COUNT = 4;

export function EventWizardSteps(props: Readonly<EventWizardStepsProps>): JSX.Element {
	const {active, setActive} = props;
	const form = useFormContext();

	const nextStep = () =>
		setActive((current) => {
			if (form.validate().hasErrors) {
				return current;
			}
			return current < WIZARD_STEPS_COUNT ? current + 1 : current;
		});
	const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

	const {mutate, eventWizardFinish} = useEventSave();

	return <>
		<Stepper active={active} mt={'sm'} orientation={useIsMobile() ? 'vertical' : undefined}>
			<Stepper.Step label={<T k={'event.wizard.step.general'}/>} description={<T k={'event.wizard.step.general.description'}/>}>
				<EventGeneralInformation/>
			</Stepper.Step>
			<Stepper.Step label={<T k={'event.wizard.step.description'}/>} description={<T k={'event.wizard.step.description.title'}/>}>
				<EventDescriptionsForWizard/>
			</Stepper.Step>
			<Stepper.Step label={<T k={'event.wizard.step.details'}/>} description={<T k={'event.wizard.step.details.description'}/>}>
				<EventDetailsPage/>
			</Stepper.Step>
			<Stepper.Step label={<T k={'event.wizard.step.slots'}/>} description={<T k={'event.wizard.step.slots.description'}/>}>
				<EventSlotlist/>
			</Stepper.Step>

			<Stepper.Completed>
				{eventWizardFinish}
			</Stepper.Completed>
		</Stepper>

		<Group justify={'right'} mt={'lg'}>
			{active !== 0 && active !== WIZARD_STEPS_COUNT &&
				<Button variant={'default'} onClick={prevStep}><T k={'action.previous'}/></Button>}
			{active < WIZARD_STEPS_COUNT - 1 && <Button onClick={nextStep}><T k={'action.next'}/></Button>}
			{active === WIZARD_STEPS_COUNT - 1 && <Button color={'green'} onClick={() => {
				nextStep();
				mutate();
			}}><T k={'action.save'}/></Button>}
		</Group>
	</>;
}
