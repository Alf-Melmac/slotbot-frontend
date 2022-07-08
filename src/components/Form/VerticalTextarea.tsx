import {createStyles, Textarea} from '@mantine/core';
import {TextareaProps} from '@mantine/core/lib/components/Textarea/Textarea';

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
