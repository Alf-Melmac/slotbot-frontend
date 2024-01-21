import {Button, Group, Stepper} from '@mantine/core';
import {EventGeneralInformation} from '../action/generalInformation/EventGeneralInformation';
import {EventDetailsPage} from '../action/details/EventDetailsPage';
import {EventSlotlist} from '../action/slotlist/EventSlotlist';
import {useEventSave} from './useEventSave';
import {Dispatch, JSX, SetStateAction} from 'react';
import {useFormContext} from '../../../contexts/event/action/EventActionFormContext';
import {T} from '../../../components/T';
import {AdditionalEventTypesProvider} from '../../../contexts/event/action/AdditionalEventTypeContext';

type EventWizardStepsProps = {
	active: number;
	setActive: Dispatch<SetStateAction<number>>;
};

export function EventWizardSteps(props: Readonly<EventWizardStepsProps>): JSX.Element {
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
		<AdditionalEventTypesProvider>
			<Stepper active={active} mt={'sm'} breakpoint={'sm'}>
				<Stepper.Step label={<T k={'event'}/>} description={<T k={'generalInformation'}/>}>
					<EventGeneralInformation/>
				</Stepper.Step>
				<Stepper.Step label={<T k={'event'}/>} description={<T k={'details'}/>}>
					<EventDetailsPage/>
				</Stepper.Step>
				<Stepper.Step label={<T k={'slotlist'}/>} description={<T k={'slotlist.alt'}/>}>
					<EventSlotlist/>
				</Stepper.Step>

				<Stepper.Completed>
					{eventWizardFinish}
				</Stepper.Completed>
			</Stepper>
		</AdditionalEventTypesProvider>

		<Group position={'right'} mt={'xl'}>
			{active !== 0 && active !== 3 &&
                <Button variant={'default'} onClick={prevStep}><T k={'action.previous'}/></Button>}
			{active < 2 && <Button onClick={nextStep}><T k={'action.next'}/></Button>}
			{active === 2 && <Button color={'green'} onClick={() => {
				nextStep();
				mutate();
			}}><T k={'action.save'}/></Button>}
		</Group>
	</>;
}
