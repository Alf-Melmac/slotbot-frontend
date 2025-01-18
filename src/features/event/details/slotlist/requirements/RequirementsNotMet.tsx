import {JSX} from 'react';
import {ActionIcon, Avatar, Flex, Group, Popover, Stack} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPuzzlePiece, faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';
import {SlotTextProps} from '../SlotText';
import classes from './RequirementsNotMet.module.css';
import {T} from '../../../../../components/T';
import {ButtonWithDisabledTooltip} from '../../../../../components/Button/ButtonWithDisabledTooltip';

type RequirementsNotMetProps = {
	requirementsNotMet: SlotTextProps['slot']['slottable']['requirementsNotMet'];
};

export function RequirementsNotMet({requirementsNotMet}: Readonly<RequirementsNotMetProps>): JSX.Element {
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
							<Group gap={2}>
								<Avatar src={requirement.icon} size={'sm'}>
									<FontAwesomeIcon icon={faPuzzlePiece}/>
								</Avatar>
								{requirement.name}
							</Group>
							<ButtonWithDisabledTooltip
								size={'compact-sm'} variant={'outline'} disabled={!list.memberAssignable}
								tooltip={'event.details.action.slot.requirementsNotMet.mark.disabled'}>
								<T k={'event.details.action.slot.requirementsNotMet.mark'}/>
							</ButtonWithDisabledTooltip>
						</Group>)}
				</Stack>)}
			</Stack>
		</Popover.Dropdown>
	</Popover>;
}
