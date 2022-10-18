import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarDay} from '@fortawesome/free-solid-svg-icons';
import {DatePicker, DatePickerProps} from '@mantine/dates';
import {usePrevious} from '@mantine/hooks';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {useEditMode} from '../../../../contexts/event/action/EditModeContext';

const datePickerProps: DatePickerProps = {
	label: 'Datum',
	placeholder: 'Event Datum',
	icon: <FontAwesomeIcon icon={faCalendarDay}/>,
	allowFreeInput: true,
	clearable: false,
	required: true,
};

export function EventDate(): JSX.Element {
	const form = useFormContext();

	const dateInputProps = form.getInputProps('date');
	const previous = usePrevious(dateInputProps.value);
	return <>
		{useEditMode() ?
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
