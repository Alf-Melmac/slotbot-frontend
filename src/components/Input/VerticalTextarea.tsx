import {createStyles, Textarea, TextareaProps} from '@mantine/core';
import {JSX} from 'react';

const useStyles = createStyles(() => ({
	textarea: {
		resize: 'vertical',
	},
}));

export function VerticalTextarea(props: Readonly<TextareaProps>): JSX.Element {
	const {classes} = useStyles();

	return (
		<Textarea {...props} classNames={{input: classes.textarea}}/>
	);
}
