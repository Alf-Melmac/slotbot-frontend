import {JSX} from 'react';
import {ActionIcon, Flex, Group, Popover, Stack} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';
import {SlotTextProps} from '../SlotText';
import classes from './RequirementsNotMet.module.css';
import {T} from '../../../../../components/T';
import {ButtonWithDisabledTooltip} from '../../../../../components/Button/ButtonWithDisabledTooltip';
import slotbotServerClient, {voidFunction} from '../../../../../hooks/slotbotServerClient';
import {AxiosError} from 'axios';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Requirement} from '../../../../requirements/Requirements';

type RequirementsNotMetProps = {
	requirementsNotMet: SlotTextProps['slot']['slottable']['requirementsNotMet'];
};

export function RequirementsNotMet({requirementsNotMet}: Readonly<RequirementsNotMetProps>): JSX.Element {
	const queryClient = useQueryClient();
	const fulfillRequirement = (requirementId: number) => slotbotServerClient.put(`/requirements/${requirementId}`).then(voidFunction);
	const {mutate, isPending} = useMutation<void, AxiosError, number>({
		mutationFn: fulfillRequirement,
		onSuccess: () => {
			// Other events also have requirements, so we need to invalidate all of them
			queryClient.invalidateQueries({queryKey: ['eventDetails']});
			// Consider removing the now fulfilled requirement from all slots instead of invalidating the complete details
		},
	});

	if (requirementsNotMet.length === 0) {
		return <></>;
	}

	return <Popover withArrow offset={4}>
		<Popover.Target>
			<ActionIcon color={'yellow'} variant={'light'}>
				<FontAwesomeIcon icon={faTriangleExclamation}/>
			</ActionIcon>
		</Popover.Target>
		<Popover.Dropdown>
			<Stack gap={'xs'}>
				<T k={'event.details.action.slot.requirementsNotMet.all'}/>
				{requirementsNotMet.map(list => <Stack key={list.id} gap={2}>
					<Flex align={'center'} wrap={'nowrap'} className={classes.listLabel}>
						{list.name}
						{list.enforced && <span className={classes.required} aria-hidden>&nbsp;*</span>}
					</Flex>
					{list.requirements.map(requirement =>
						<Group key={requirement.id} justify={'space-between'} wrap={'nowrap'}>
							<Requirement requirement={requirement}/>
							<ButtonWithDisabledTooltip
								size={'compact-sm'} variant={'outline'} disabled={!list.memberAssignable}
								tooltip={'event.details.action.slot.requirementsNotMet.mark.disabled'}
								onClick={() => mutate(requirement.id)} loading={isPending}>
								<T k={'event.details.action.slot.requirementsNotMet.mark'}/>
							</ButtonWithDisabledTooltip>
						</Group>)}
				</Stack>)}
			</Stack>
		</Popover.Dropdown>
	</Popover>;
}
