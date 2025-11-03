import {PolymorphicComponentProps, Text, TextProps, Typography} from '@mantine/core';
import {EventDetailsDto} from '../eventTypes';
import {JSX} from 'react';
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

	return <Typography>
		<Text {...textProps} dangerouslySetInnerHTML={{__html: description}} className={classes.description}/>
	</Typography>;
}
