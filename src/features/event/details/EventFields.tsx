import {EventFieldReferencelessDto} from '../eventTypes';
import {Anchor, Grid, Text} from '@mantine/core';

type EventFieldsProps = {
	fields: Array<EventFieldReferencelessDto>;
};

function getFieldText(field: EventFieldReferencelessDto, index: number): JSX.Element {
	return field.link ?
		<Anchor id={`field${index}`} href={field.link}>{field.text}</Anchor>
		:
		<Text id={`field${index}`}>{field.text}</Text>;
}

export function EventFields(props: EventFieldsProps): JSX.Element {
	return (
		<>
			{props.fields.map((field, index) => (
				<Grid key={index}>
					<Grid.Col span={4}>
						<Text component={'label'} weight={'bold'} htmlFor={`field${index}`}>{field.title}</Text>
					</Grid.Col>
					<Grid.Col span={8}>
						{getFieldText(field, index)}
					</Grid.Col>
				</Grid>
			))}
		</>
	);
}
