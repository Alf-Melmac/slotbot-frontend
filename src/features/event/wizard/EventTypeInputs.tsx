import {Alert, ColorInput, Grid, Select} from '@mantine/core';
import {UseQueryResult} from 'react-query';
import {EventTypeDto} from '../eventTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import {TEXT} from '../../../utils/maxLength';
import {useState} from 'react';

const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

type EventTypeInputsProps = {
	query: UseQueryResult<Array<EventTypeDto>, Error>
};

export function EventTypeInputs(props: EventTypeInputsProps): JSX.Element {
	const {query} = props;
	const eventTypes = query.data;
	const [eventTypeName, setEventTypeName] = useState('');
	const [eventTypeColor, setEventTypeColor] = useState(randomColor());
	const [disabledColorInput, disableColorInput] = useState(false);
	const [data, setData] = useState(eventTypes?.map(type => type.name) || []);

	return (
		<>
			{!eventTypes &&
                <Alert icon={<FontAwesomeIcon icon={faCircleExclamation}/>} color={'red'} mt={'xs'}>
                    Event-Typen konnten nicht geladen werden. Bitte überprüfe deine Internetverbindung und deinen
                    Login-Status. Du kannst so weiter arbeiten, aber vielleicht nicht speichern. Neuladen der Seite
                    sollte das Problem beheben.
                </Alert>}
			<Grid>
				<Grid.Col span={8}>
					<Select label={'Event-Typ-Name'}
							maxLength={TEXT}
							required
							value={eventTypeName}
							onChange={changedValue => {
								const existingEventType = eventTypes?.find(value => changedValue === value.name);
								if (existingEventType) {
									setEventTypeColor(existingEventType.color);
									disableColorInput(true);
								} else {
									setEventTypeColor(randomColor());
									disableColorInput(false);
								}
								setEventTypeName(changedValue || '');
							}}
							data={data}
							searchable
							creatable
							getCreateLabel={input => input}
							onCreate={(input) => {
								const item = {value: input, label: input};
								setData((current) => [...current, input]);
								return item;
							}}/>
				</Grid.Col>
				<Grid.Col span={4}>
					<ColorInput label={'Event-Typ-Farbe'}
								value={eventTypeColor}
								onChange={setEventTypeColor}
								disabled={disabledColorInput}/>
				</Grid.Col>
			</Grid>
		</>
	);
}
