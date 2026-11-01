import {Box, Button, ButtonProps, Tooltip, TooltipProps} from '@mantine/core';
import {ButtonHTMLAttributes, DOMAttributes, JSX} from 'react';
import {TextKey} from '../../contexts/language/Language';
import {T} from '../T';
import classes from './ButtonWithDisabledTooltip.module.css';

type ButtonWithDisabledTooltipProps = ButtonProps &
	DOMAttributes<HTMLButtonElement> &
	Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> &
	({
		tooltip: TextKey;
		tooltipNode?: never;
	} | {
		tooltip?: never;
		tooltipNode: TooltipProps['label'];
	});

export function ButtonWithDisabledTooltip(props: Readonly<ButtonWithDisabledTooltipProps>): JSX.Element {
	const {tooltip, tooltipNode, ...buttonProps} = props;

	return (
		props.disabled ?
			<Tooltip label={tooltip !== undefined ? <T k={tooltip}/> : tooltipNode}>
				<Box display={props.display} className={classes.notAllowed}>
					<Button {...buttonProps}/>
				</Box>
			</Tooltip>
			:
			<Button {...buttonProps}/>
	);
}
