import {Alert, ColorInput, Grid, Group, Select} from '@mantine/core';
import {EventTypeDto} from '../../eventTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleExclamation, faCirclePause} from '@fortawesome/free-solid-svg-icons';
import {TEXT} from '../../../../utils/maxLength';
import {JSX, useEffect, useState} from 'react';
import {UseQueryResult} from '@tanstack/react-query';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {useEditMode} from '../../../../contexts/event/action/EditModeContext';
import {useEventUpdate} from '../useEventUpdate';
import {usePrevious} from '@mantine/hooks';
import {T} from '../../../../components/T';
import {randomColor} from '../utils';
import {useAdditionalEventType} from '../../../../contexts/event/action/AdditionalEventTypeContext';

type EventTypeInputsProps = {
	query: UseQueryResult<Array<EventTypeDto>, Error>;
};

export function EventTypeInputs(props: Readonly<EventTypeInputsProps>): JSX.Element {
	const {query} = props;
	const eventTypes = query.data;
	const form = useFormContext();

	function setEventTypeColor(color: EventTypeDto['color']): void {
		// @ts-ignore eventType.color accepts strings
		form.setFieldValue('eventType.color', color);
	}

	const [colorInputDisabled, setColorInputDisabled] = useState(false);
	const eventTypeNames = eventTypes?.map(type => type.name) ?? [];
	const {additionalEventType, setAdditionalEventType} = useAdditionalEventType();
	additionalEventType && eventTypeNames.push(additionalEventType);
	const [data, setData] = useState(eventTypeNames);

	useEffect(() => {
		const existingEventType = eventTypes?.find(value => form.values.eventType.name === value.name);
		if (existingEventType) {
			setEventTypeColor(existingEventType.color);
			setColorInputDisabled(true);
		} else {
			if (colorInputDisabled) {
				setEventTypeColor(randomColor());
			}
			setColorInputDisabled(false);
		}
	}, [form.values.eventType.name]);

	const editMode = useEditMode();

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
								setAdditionalEventType(input);
								return item;
							}}
							{...form.getInputProps('eventType.name')}/>
				</Grid.Col>
				<Grid.Col span={4}>
					<ColorInput label={<T k={'event.eventType.color'}/>}
								disabled={colorInputDisabled}
								{...form.getInputProps('eventType.color')}/>
				</Grid.Col>
			</Grid>
		</>
	);
}
