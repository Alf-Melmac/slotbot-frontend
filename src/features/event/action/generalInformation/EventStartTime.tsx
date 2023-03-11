import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClock} from '@fortawesome/free-solid-svg-icons';
import {TimeInput} from '@mantine/dates';
import {useDebouncedValue, usePrevious} from '@mantine/hooks';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {useEventUpdate} from '../useEventUpdate';
import {areHoursAndMinutesEqual, formatLocalDateTimeToUtcDate} from '../../../../utils/dateHelper';
import {useEffect} from 'react';
import {useEditMode} from '../../../../contexts/event/action/EditModeContext';
import {T} from '../../../../components/T';
import {useLanguage} from '../../../../contexts/language/Language';

export function EventStartTime(): JSX.Element {
	const form = useFormContext();

	const [debounced] = useDebouncedValue(form.values.startTime, 1000);
	const {mutate} = useEventUpdate({dateTime: formatLocalDateTimeToUtcDate(form.values.date, debounced)},
		result => {
			const date = new Date(result.dateTime);
			form.setFieldValue('date', date);
			form.setFieldValue('startTime', date);
		});
	const previous = usePrevious(debounced);

	const editMode = useEditMode();
	useEffect(() => {
		if (!editMode || previous === undefined || areHoursAndMinutesEqual(previous, debounced)) return;
		mutate();
	}, [debounced]);

	const {t} = useLanguage();
	return <TimeInput label={<T k={'event.startTime'}/>} placeholder={t('event.startTime.placeholder')}
					  icon={<FontAwesomeIcon icon={faClock}/>} clearable={false} required
					  {...form.getInputProps('startTime')}/>;
}
