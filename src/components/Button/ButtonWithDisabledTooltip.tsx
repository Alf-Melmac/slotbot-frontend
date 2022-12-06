import {Box, Button, ButtonProps, Tooltip} from '@mantine/core';
import {DOMAttributes} from 'react';
import {TextKey} from '../../contexts/language/Language';
import {T} from '../T';

export function ButtonWithDisabledTooltip(props: ButtonProps & DOMAttributes<HTMLButtonElement> & { tooltip: TextKey }): JSX.Element {
	return (
		props.disabled ?
			<Tooltip label={<T k={props.tooltip}/>}>
				<Box sx={{cursor: 'not-allowed'}}>
					<Button {...props}/>
				</Box>
			</Tooltip>
			:
			<Button {...props}/>
	);
}
