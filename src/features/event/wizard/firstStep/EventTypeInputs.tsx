import {Alert, ColorInput, Grid, Select} from '@mantine/core';
import {EventTypeDto} from '../../eventTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import {TEXT} from '../../../../utils/maxLength';
import {useEffect, useState} from 'react';
import {EventWizardStepProps} from '../EventWizard';
import {UseQueryResult} from '@tanstack/react-query';

export const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

type EventTypeInputsProps = {
	query: UseQueryResult<Array<EventTypeDto>, Error>;
	useFormReturn: EventWizardStepProps['form'];
};

export function EventTypeInputs(props: EventTypeInputsProps): JSX.Element {
	const {query, useFormReturn} = props;
	const eventTypes = query.data;

	function setEventTypeColor(color: EventTypeDto['color']): void {
		useFormReturn.setFieldValue('eventType.color', color);
	}

	const [disabledColorInput, disableColorInput] = useState(false);
	const [data, setData] = useState(eventTypes?.map(type => type.name) || []);

	useEffect(() => {
		const existingEventType = eventTypes?.find(value => useFormReturn.values.eventType.name === value.name);
		if (existingEventType) {
			setEventTypeColor(existingEventType.color);
			disableColorInput(true);
		} else {
			if (disabledColorInput) {
				setEventTypeColor(randomColor());
			}
			disableColorInput(false);
		}
	}, [useFormReturn.values.eventType.name]);

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
							data={data}
							searchable
							creatable
							getCreateLabel={input => input}
							onCreate={(input) => {
								const item = {value: input, label: input};
								setData((current) => [...current, input]);
								return item;
							}}
							{...useFormReturn.getInputProps('eventType.name')}/>
				</Grid.Col>
				<Grid.Col span={4}>
					<ColorInput label={'Event-Typ-Farbe'}
								disabled={disabledColorInput}
								{...useFormReturn.getInputProps('eventType.color')}/>
				</Grid.Col>
			</Grid>
		</>
	);
}
