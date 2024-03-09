import {Button, ButtonProps} from '@mantine/core';
import {DOMAttributes, JSX} from 'react';
import classes from './PulsatingButton.module.css';

export function PulsatingButton(props: Readonly<ButtonProps & DOMAttributes<HTMLButtonElement>>): JSX.Element {
	return <Button {...props} className={props.disabled ? undefined : classes.button}/>;
}
