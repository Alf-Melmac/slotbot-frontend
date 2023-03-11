import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarDay} from '@fortawesome/free-solid-svg-icons';
import {DatePicker, DatePickerProps} from '@mantine/dates';
import {usePrevious} from '@mantine/hooks';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {useEditMode} from '../../../../contexts/event/action/EditModeContext';
import {useEventUpdate} from '../useEventUpdate';
import {formatLocalDateTimeToUtcDate, isDateEqual} from '../../../../utils/dateHelper';
import {useLanguage} from '../../../../contexts/language/Language';

export function EventDate(): JSX.Element {
	const {t} = useLanguage();
	const datePickerProps: DatePickerProps = {
		label: t('event.date'),
		placeholder: t('event.date.placeholder'),
		icon: <FontAwesomeIcon icon={faCalendarDay}/>,
		allowFreeInput: true,
		clearable: false,
		required: true,
	};

	const form = useFormContext();

	const {mutate} = useEventUpdate({dateTime: formatLocalDateTimeToUtcDate(form.values.date, form.values.startTime)},
		result => {
			const date = new Date(result.dateTime);
			form.setFieldValue('date', date);
			form.setFieldValue('startTime', date);
		});
	const previous = usePrevious(form.values.date);
	const dateInputProps = form.getInputProps('date');
	return <>
		{useEditMode() ?
			<DatePicker {...datePickerProps} {...dateInputProps} onDropdownClose={() => {
				if (!form.isValid('date') || previous === undefined || isDateEqual(form.values.date, previous)) return;
				mutate();
			}}/>
			:
			<DatePicker {...datePickerProps} {...dateInputProps} minDate={new Date()}/>
		}
	</>;
}
