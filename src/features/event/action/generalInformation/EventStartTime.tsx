import {EventAction, EventActionPageProps} from '../EventActionPage';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClock} from '@fortawesome/free-solid-svg-icons';
import {TimeInput, TimeInputProps} from '@mantine/dates';
import {usePrevious} from '@mantine/hooks';
import {changeHandler} from '../../../../utils/formHelper';

const timeInputProps: TimeInputProps = {
	label: 'Startzeit',
	placeholder: 'Event Datum',
	icon: <FontAwesomeIcon icon={faClock}/>,
	clearable: false,
	required: true,
};

export function EventStartTime<FormReturnType extends EventAction>(props: EventActionPageProps<FormReturnType>): JSX.Element {
	const {editMode, form} = props;

	const startTimeInputProps = form.getInputProps('startTime');
	const previous = usePrevious(startTimeInputProps.value);
	return <>
		{editMode ?
			<TimeInput {...timeInputProps} {...startTimeInputProps}
					   onChange={changeHandler(startTimeInputProps, true, () => {
						   if (form.values.date !== previous) {
							   console.log(form.values.startTime); // TODO mutate
						   }
					   })}/>
			:
			<TimeInput {...timeInputProps} {...startTimeInputProps}/>
		}
	</>;
}
