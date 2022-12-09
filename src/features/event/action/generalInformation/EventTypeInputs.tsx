import {Alert, ColorInput, Grid, Group, Select} from '@mantine/core';
import {EventTypeDto} from '../../eventTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleExclamation, faCirclePause} from '@fortawesome/free-solid-svg-icons';
import {TEXT} from '../../../../utils/maxLength';
import {useEffect, useState} from 'react';
import {UseQueryResult} from '@tanstack/react-query';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {useEditMode} from '../../../../contexts/event/action/EditModeContext';
import {useEventUpdate} from '../useEventUpdate';
import {usePrevious} from '@mantine/hooks';
import {T} from '../../../../components/T';

export const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

type EventTypeInputsProps = {
	query: UseQueryResult<Array<EventTypeDto>, Error>;
};

export function EventTypeInputs(props: EventTypeInputsProps): JSX.Element {
	const {query} = props;
	const eventTypes = query.data;
	const form = useFormContext();

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

	const editMode = useEditMode();
	const eventTypeNameInputProps = form.getInputProps('eventType.name');

	const {mutate} = useEventUpdate({eventType: form.values.eventType},
		result => form.setFieldValue('eventType', result.eventType));
	const previousEventType = usePrevious(form.values.eventType.color);
	useEffect(() => {
		if (!editMode || !previousEventType) return;

		const newEventType = form.values.eventType.color;
		if (previousEventType !== newEventType) {
			mutate();
		}
	}, [form.values.eventType.color]); //Update eventType after color has been synchronized
	return (
		<>
			{!eventTypes &&
                <Alert icon={<FontAwesomeIcon icon={faCircleExclamation}/>} color={'red'} mt={'xs'}>
                    <T k={'event.eventType.error'}/>
                </Alert>
			}
			<Grid>
				<Grid.Col span={8}>
					<Select label={<T k={'event.eventType.name'}/>}
							maxLength={TEXT}
							required
							data={data}
							searchable
							creatable={!editMode}
							nothingFound={<Group position={'center'}><FontAwesomeIcon icon={faCirclePause}/> <T
								k={'event.evenType.name.edit.nothingFound'}/></Group>}
							getCreateLabel={input => input}
							onCreate={(input) => {
								const item = {value: input, label: input};
								setData((current) => [...current, input]);
								return item;
							}}
							{...eventTypeNameInputProps}/>
				</Grid.Col>
				<Grid.Col span={4}>
					<ColorInput label={<T k={'event.eventType.color'}/>}
								disabled={disabledColorInput}
								{...form.getInputProps('eventType.color')}/>
				</Grid.Col>
			</Grid>
		</>
	);
}
