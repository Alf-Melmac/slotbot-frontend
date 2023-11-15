import {Button, ButtonProps, createStyles, keyframes} from '@mantine/core';
import {DOMAttributes, JSX} from 'react';

const pulsate = keyframes({
	'0%': {
		transform: 'scale(0.95)',
	},

	'70%': {
		transform: 'scale(1)',
	},

	'100%': {
		transform: 'scale(0.95)',
	},
});

const useStyles = createStyles(() => ({
	button: {
		animation: `${pulsate} 2s infinite`,

		'&:focus, &:hover': {
			animation: 'unset',
		},
	},
}));

export function PulsatingButton(props: Readonly<ButtonProps & DOMAttributes<HTMLButtonElement>>): JSX.Element {
	const {classes} = useStyles();

	return <Button {...props} className={props.disabled ? undefined : classes.button}/>;
}
