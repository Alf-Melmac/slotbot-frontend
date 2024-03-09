import {Box, Button, ButtonProps, Tooltip} from '@mantine/core';
import {DOMAttributes, JSX} from 'react';
import {TextKey} from '../../contexts/language/Language';
import {T} from '../T';
import classes from './ButtonWithDisabledTooltip.module.css';

type ButtonWithDisabledTooltipProps = ButtonProps &
	DOMAttributes<HTMLButtonElement> &
	{
		tooltip: TextKey;
	};

export function ButtonWithDisabledTooltip(props: Readonly<ButtonWithDisabledTooltipProps>): JSX.Element {
	const {disabled, tooltip} = props;

	return (
		disabled ?
			<Tooltip label={<T k={tooltip}/>}>
				<Box display={props.display} className={classes.notAllowed}>
					<Button {...props}/>
				</Box>
			</Tooltip>
			:
			<Button {...props}/>
	);
}
