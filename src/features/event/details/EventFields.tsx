import {EventFieldReferencelessDto} from '../eventTypes';
import {Grid, Text, Typography} from '@mantine/core';
import {Fragment, JSX} from 'react';

type EventFieldsProps = {
	fields: Array<EventFieldReferencelessDto>;
};

export function EventFields(props: Readonly<EventFieldsProps>): JSX.Element {
	return <Grid rowGap={'xs'}>
		{props.fields.map((field, index) => (
			<Fragment key={field.id}>
				<Grid.Col span={4}>
					<Text component={'label'} fw={'bold'} htmlFor={`field${index}`}>{field.title}</Text>
				</Grid.Col>
				<Grid.Col span={8}>
					<Typography>
						<Text dangerouslySetInnerHTML={{__html: field.textAsHtml}}/>
					</Typography>
				</Grid.Col>
			</Fragment>
		))}
	</Grid>;
}
