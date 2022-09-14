import {EventAction, EventActionPageProps} from '../EventActionPage';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarDay} from '@fortawesome/free-solid-svg-icons';
import {DatePicker, DatePickerProps} from '@mantine/dates';
import {usePrevious} from '@mantine/hooks';

const datePickerProps: DatePickerProps = {
	label: 'Datum',
	placeholder: 'Event Datum',
	icon: <FontAwesomeIcon icon={faCalendarDay}/>,
	allowFreeInput: true,
	clearable: false,
	required: true,
};

export function EventDate<FormReturnType extends EventAction>(props: EventActionPageProps<FormReturnType>): JSX.Element {
	const {editMode = false, form} = props;

	const dateInputProps = form.getInputProps('date');
	const previous = usePrevious(dateInputProps.value);
	return <>
		{editMode ?
			<DatePicker {...datePickerProps} {...dateInputProps} onDropdownClose={() => {
				if (form.values.date !== previous) {
					console.log(form.values.date); // TODO mutate
				}
			}}/>
			:
			<DatePicker {...datePickerProps} {...dateInputProps} minDate={new Date()}/>
		}
	</>;
}
