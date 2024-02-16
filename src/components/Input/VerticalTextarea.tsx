import { Textarea, TextareaProps } from '@mantine/core';
import {JSX} from 'react';
import classes from './VerticalTextarea.module.css'

export function VerticalTextarea(props: Readonly<TextareaProps>): JSX.Element {
    return (
		<Textarea {...props} classNames={{input: classes.textarea}}/>
	);
}
