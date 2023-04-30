import {Box, Button, ButtonProps, Tooltip} from '@mantine/core';
import {DOMAttributes} from 'react';
import {TextKey} from '../../contexts/language/Language';
import {T} from '../T';

type ButtonWithDisabledTooltipProps = ButtonProps &
	DOMAttributes<HTMLButtonElement> &
	{
		tooltip: TextKey;
	};

export function ButtonWithDisabledTooltip(props: ButtonWithDisabledTooltipProps): JSX.Element {
	const {disabled, tooltip} = props;

	return (
		disabled ?
			<Tooltip label={<T k={tooltip}/>}>
				<Box sx={{cursor: 'not-allowed'}} display={props.display}>
					<Button {...props}/>
				</Box>
			</Tooltip>
			:
			<Button {...props}/>
	);
}
