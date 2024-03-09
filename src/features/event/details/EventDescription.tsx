import {PolymorphicComponentProps, Text, TextProps} from '@mantine/core';
import {EventDetailsDto} from '../eventTypes';
import {JSX, useEffect, useRef} from 'react';
import classes from './EventDescription.module.css';

type EventDescriptionProps = TextProps &
	Pick<PolymorphicComponentProps<'p', TextProps>, 'ref'> & {
	description: EventDetailsDto['descriptionAsHtml'];
};

/**
 * Renders the event description.
 *
 * Removes unnecessary top margin from the first element in the description.
 */
export function EventDescription(props: EventDescriptionProps): JSX.Element {
	const {description, ...textProps} = props;

	const descriptionTextRef = useRef<HTMLParagraphElement>(null);
	useEffect(() => {
		if (!descriptionTextRef.current) return;

		const h1Element: HTMLHeadingElement | null = descriptionTextRef.current.querySelector('p > :is(h1, h2, h3, h4, h5, h6)');
		if (!h1Element) return;
		const previousSibling = h1Element.previousSibling;
		if (previousSibling == null) {
			h1Element.style.marginTop = '0';
		}
	}, [description]);

	return <Text {...textProps} dangerouslySetInnerHTML={{__html: props.description}} ref={descriptionTextRef}
				 className={classes.forceWrap}/>;
}
