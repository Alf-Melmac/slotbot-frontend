import {createStyles, Textarea, TextareaProps} from '@mantine/core';

const useStyles = createStyles((theme) => ({
	textarea: {
		resize: 'vertical',
	},
}));

export function VerticalTextarea(props: TextareaProps): JSX.Element {
	const {classes} = useStyles();

	return (
		<Textarea {...props} classNames={{input: classes.textarea}}/>
	);
}
