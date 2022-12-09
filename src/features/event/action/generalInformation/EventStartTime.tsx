import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClock} from '@fortawesome/free-solid-svg-icons';
import {TimeInput} from '@mantine/dates';
import {useDebouncedValue, usePrevious} from '@mantine/hooks';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {useEventUpdate} from '../useEventUpdate';
import {formatTime, parseTime} from '../../../../utils/dateHelper';
import {useEffect} from 'react';
import {useEditMode} from '../../../../contexts/event/action/EditModeContext';
import {T} from '../../../../components/T';
import {useLanguage} from '../../../../contexts/language/Language';

export function EventStartTime(): JSX.Element {
	const form = useFormContext();

	const [debounced] = useDebouncedValue(form.values.startTime, 1000);
	// @ts-ignore
	const {mutate} = useEventUpdate({startTime: formatTime(debounced)},
		// @ts-ignore
		result => form.setFieldValue('startTime', parseTime(result.startTime)));
	const previous = usePrevious(debounced);

	const editMode = useEditMode();
	useEffect(() => {
		// @ts-ignore It's a date
		if (!editMode || previous === undefined || previous.getTime() === debounced.getTime()) return;
		mutate();
	}, [debounced]);

	const {t} = useLanguage();
	return <TimeInput label={<T k={'event.startTime'}/>} placeholder={t('event.startTime.placeholder')}
					  icon={<FontAwesomeIcon icon={faClock}/>} clearable={false} required
					  {...form.getInputProps('startTime')}/>;
}
