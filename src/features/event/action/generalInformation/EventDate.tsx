import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarDay} from '@fortawesome/free-solid-svg-icons';
import {DateInput, DateInputProps} from '@mantine/dates';
import {usePrevious} from '@mantine/hooks';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {useEventAction} from '../../../../contexts/event/action/EventActionContext';
import {useEventUpdate} from '../useEventUpdate';
import {formatLocalDateTimeToUtcDate, getDate, getTimeShort, isDateEqual} from '../../../../utils/dateHelper';
import {useLanguage} from '../../../../contexts/language/Language';
import {JSX} from 'react';
import dayjs from 'dayjs';

export function EventDate(): JSX.Element {
	const {t} = useLanguage();
	const datePickerProps: DateInputProps = {
		label: t('event.date'),
		placeholder: t('event.date.placeholder'),
		leftSection: <FontAwesomeIcon icon={faCalendarDay}/>,
		clearable: false,
		required: true,
	};

	const form = useFormContext();

	const {mutate} = useEventUpdate({dateTime: formatLocalDateTimeToUtcDate(form.values.date, form.values.startTime)},
		result => {
			const dateTime = dayjs(result.dateTime);
			form.setFieldValue('date', getDate(dateTime));
			form.setFieldValue('startTime', getTimeShort(dateTime));
		});
	const previous = usePrevious(form.values.date);
	const dateInputProps = form.getInputProps('date');
	return <>
		{useEventAction().editMode ?
			<DateInput {...datePickerProps} {...dateInputProps} onDateChange={() => {
				if (!form.isValid('date') || previous === undefined || isDateEqual(form.values.date, previous)) return;
				mutate();
			}}/>
			:
			<DateInput {...datePickerProps} {...dateInputProps} minDate={new Date()}/>
		}
	</>;
}
