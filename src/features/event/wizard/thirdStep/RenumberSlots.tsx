import {isEmpty} from 'lodash';
import {Button} from '@mantine/core';
import {EventWizardStepProps} from '../EventWizard';

export function RenumberSlots(props: EventWizardStepProps): JSX.Element {
    const {form} = props;

    return (
        <Button variant={'default'} onClick={() => {
            const formSquadList = form.values['squadList'];
            if (isEmpty(formSquadList)) return;
            let num = 1;
            formSquadList.forEach(squad => squad.slotList.forEach(slot => {
                slot.number = num;
                num++;
            }));
            form.setFieldValue('squadList', formSquadList);
        }}>Neu nummerieren</Button>
    );
}
