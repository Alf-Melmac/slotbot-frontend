import {isEmpty} from 'lodash';
import {Button} from '@mantine/core';
import {useFormContext} from '../EventActionFormContext';

export function RenumberSlots(): JSX.Element {
	const form = useFormContext();

	return (
		<Button variant={'default'} onClick={() => {
			const formSquadList = form.values['squadList'];
			if (isEmpty(formSquadList)) return;
			let num = 1;
			formSquadList.forEach(squad => squad.slotList.forEach(slot => {
				slot.number = num;
				num++;
			}));
			// @ts-ignore Just changed a parameter field of the same object...
			form.setFieldValue('squadList', formSquadList);
		}}>Neu nummerieren</Button>
	);
}
