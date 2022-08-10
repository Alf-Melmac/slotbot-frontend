import {Button, ButtonProps, Tooltip} from '@mantine/core';
import {DOMAttributes} from 'react';

export function ButtonWithDisabledTooltip(props: ButtonProps & DOMAttributes<HTMLButtonElement> & { tooltip: string }): JSX.Element {
	return (
		props.disabled ?
			<Tooltip label={props.tooltip}>
				<Button {...props}/>
			</Tooltip>
			:
			<Button {...props}/>
	);
}
