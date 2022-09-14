import {Alert, ColorInput, Grid, Group, Select} from '@mantine/core';
import {EventTypeDto} from '../../eventTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleExclamation, faCirclePause} from '@fortawesome/free-solid-svg-icons';
import {TEXT} from '../../../../utils/maxLength';
import {useEffect, useState} from 'react';
import {UseQueryResult} from '@tanstack/react-query';
import {EventAction, EventActionPageProps} from '../EventActionPage';
import {changeHandler} from '../../../../utils/formHelper';

export const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

type EventTypeInputsProps<FormReturnType> = EventActionPageProps<FormReturnType> & {
	query: UseQueryResult<Array<EventTypeDto>, Error>;
};

export function EventTypeInputs<FormReturnType extends EventAction>(props: EventTypeInputsProps<FormReturnType>): JSX.Element {
	const {query, form, editMode = false} = props;
	const eventTypes = query.data;

	function setEventTypeColor(color: EventTypeDto['color']): void {
		// @ts-ignore eventType.color accepts strings
		form.setFieldValue('eventType.color', color);
	}

	const [disabledColorInput, disableColorInput] = useState(false);
	const [data, setData] = useState(eventTypes?.map(type => type.name) || []);

	useEffect(() => {
		const existingEventType = eventTypes?.find(value => form.values.eventType.name === value.name);
		if (existingEventType) {
			setEventTypeColor(existingEventType.color);
			disableColorInput(true);
		} else {
			if (disabledColorInput) {
				setEventTypeColor(randomColor());
			}
			disableColorInput(false);
		}
	}, [form.values.eventType.name]);

	const eventTypeNameInputProps = form.getInputProps('eventType.name');
	return (
		<>
			{!eventTypes &&
                <Alert icon={<FontAwesomeIcon icon={faCircleExclamation}/>} color={'red'} mt={'xs'}>
                    Event-Typen konnten nicht geladen werden. Bitte überprüfe deine Internetverbindung und deinen
                    Login-Status. Du kannst so weiter arbeiten, aber vielleicht nicht speichern. Neuladen der Seite
                    sollte das Problem beheben.
                </Alert>
			}
			<Grid>
				<Grid.Col span={8}>
					<Select label={'Event-Typ-Name'}
							maxLength={TEXT}
							required
							data={data}
							searchable
							creatable={!editMode}
							nothingFound={<Group position={'center'}><FontAwesomeIcon icon={faCirclePause}/> Aktuell können im Editiermodus keine neuen Event-Typen angelegt werden.</Group>}
							getCreateLabel={input => input}
							onCreate={(input) => {
								const item = {value: input, label: input};
								setData((current) => [...current, input]);
								return item;
							}}
							{...eventTypeNameInputProps}
						//TODO mutate
							onChange={changeHandler(eventTypeNameInputProps, editMode, () => console.log(form.values.eventType))}/>
				</Grid.Col>
				<Grid.Col span={4}>
					<ColorInput label={'Event-Typ-Farbe'}
								disabled={disabledColorInput}
								{...form.getInputProps('eventType.color')}/>
				</Grid.Col>
			</Grid>
		</>
	);
}
