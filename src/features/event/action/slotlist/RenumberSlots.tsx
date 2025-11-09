import {isEmpty} from 'lodash-es';
import {Button} from '@mantine/core';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {T} from '../../../../components/T';
import {JSX} from 'react';

export function RenumberSlots(): JSX.Element {
	const form = useFormContext();

	return (
		<Button variant={'default'} onClick={() => {
			const formSquadList = form.values['squadList'];
			if (isEmpty(formSquadList)) return;
			let num = 1;
			for (const squad of formSquadList) {
				for (const slot of squad.slotList) {
					slot.number = num++;
				}
			}
			// @ts-ignore Just changed a parameter field of the same object...
			form.setFieldValue('squadList', formSquadList);
		}}><T k={'slotlist.renumber'}/></Button>
	);
}
