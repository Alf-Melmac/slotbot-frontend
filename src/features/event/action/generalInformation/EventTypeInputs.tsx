import {Alert, Autocomplete, ColorInput, Grid} from '@mantine/core';
import {EventTypeDto} from '../../eventTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import {TEXT} from '../../../../utils/maxLength';
import {JSX, useEffect, useState} from 'react';
import {UseQueryResult} from '@tanstack/react-query';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {useEditMode} from '../../../../contexts/event/action/EditModeContext';
import {useEventUpdate} from '../useEventUpdate';
import {T} from '../../../../components/T';
import {randomColor} from '../utils';
import classes from './EventTypesInputs.module.css';
import {PulsatingButton} from '../../../../components/Button/PulsatingButton';
import {convertDtoToFormEvent} from '../../edit/utils';

type EventTypeInputsProps = {
	query: UseQueryResult<EventTypeDto[], Error>;
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
	useEffect(() => {
		const existingEventType = eventTypes?.find(value => form.values.eventType.name === value.name);
		if (existingEventType) {
			form.setFieldValue('eventType.id', existingEventType.id);
			setEventTypeColor(existingEventType.color);
			setColorInputDisabled(true);
		} else {
			// @ts-ignore Reset the id
			form.setFieldValue('eventType.id', undefined);
			if (colorInputDisabled) {
				setEventTypeColor(randomColor());
			}
			setColorInputDisabled(false);
		}
	}, [form.values.eventType.name]);

	const {mutate} = useEventUpdate({eventType: form.values.eventType},
		result => {
			form.setFieldValue('eventType', result.eventType);
			// @ts-ignore
			form.resetDirty(convertDtoToFormEvent(result));
		});

	const editMode = useEditMode();
	return (
		<>
			{!eventTypes &&
                <Alert icon={<FontAwesomeIcon icon={faCircleExclamation}/>} color={'red'} mt={'xs'}>
                    <T k={'event.eventType.error'}/>
                </Alert>
			}
			<Grid>
				<Grid.Col span={{base: 12, [editMode ? 'sm' : 'xs']: 8}}>
					<Autocomplete
						label={<T k={'event.eventType.name'}/>}
						maxLength={TEXT}
						required
						data={eventTypes?.map(type => type.name) ?? []}
						{...form.getInputProps('eventType.name')}
					/>
				</Grid.Col>
				<Grid.Col span={editMode ? {base: 6, sm: 2} : {base: 12, xs: 4}}>
					<ColorInput label={<T k={'event.eventType.color'}/>}
								required
								disabled={colorInputDisabled}
								{...form.getInputProps('eventType.color')}/>
				</Grid.Col>
				{editMode &&
                    <Grid.Col span={{base: 6, sm: 2}} className={classes.editModeControls}>
                        <PulsatingButton onClick={() => mutate()}
                                         disabled={!form.isDirty('eventType') || !form.isValid('eventType')}>
                            <T k={'event.eventType.save'}/>
                        </PulsatingButton>
                    </Grid.Col>
				}
			</Grid>
		</>
	);
}
