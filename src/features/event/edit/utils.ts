import {EventEditDto} from '../eventTypes';
import {EventEditFormType} from '../../../contexts/event/action/EventActionFormContext';
import {replaceNullWithEmpty, replaceNullWithUndefined} from '../../../utils/typesHelper';
import {getTimeShort} from '../../../utils/dateHelper';

/**
 * Converts a {@link EventEditDto} to the format {@link EventEditFormType expected by the form}.
 */
export function convertDtoToFormEvent(dto: EventEditDto): EventEditFormType {
	const {dateTime, ...eventDto} = dto;
	replaceNullWithEmpty(eventDto, ['description', 'missionLength', 'missionType', 'pictureUrl']);
	replaceNullWithUndefined(eventDto, ['reserveParticipating']);
	const date = new Date(dateTime);
	return {...eventDto, date: date, startTime: getTimeShort(date)};
}
