import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarDay} from '@fortawesome/free-solid-svg-icons';
import {DatePicker, DatePickerProps} from '@mantine/dates';
import {usePrevious} from '@mantine/hooks';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {useEditMode} from '../../../../contexts/event/action/EditModeContext';
import {useEventUpdate} from '../useEventUpdate';
import {formatDate, parseDate} from '../../../../utils/dateHelper';

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

	// @ts-ignore
	const {mutate} = useEventUpdate({date: formatDate(form.values.date)},
		// @ts-ignore
		result => form.setFieldValue('date', parseDate(result.date)));
	const previous = usePrevious(form.values.date);
	const dateInputProps = form.getInputProps('date');
	return <>
		{useEditMode() ?
			<DatePicker {...datePickerProps} {...dateInputProps} onDropdownClose={() => {
				if (form.isValid('date') && form.values.date !== previous) {
					mutate();
				}
			}}/>
			:
			<DatePicker {...datePickerProps} {...dateInputProps} minDate={new Date()}/>
		}
	</>;
}
