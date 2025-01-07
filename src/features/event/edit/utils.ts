import {EventEditDto, EventPostDto} from '../eventTypes';
import {EventEditFormType, EventWizardFormType} from '../../../contexts/event/action/EventActionFormContext';
import {
	replaceBooleanStringWithBoolean,
	replaceNullWithEmpty,
	replaceNullWithUndefined,
} from '../../../utils/typesHelper';
import {getTimeShort} from '../../../utils/dateHelper';

/**
 * Converts a {@link EventEditDto} to the format {@link EventEditFormType expected by the form}.
 */
export function convertDtoToFormEvent(dto: EventEditDto): EventEditFormType {
	const {dateTime, requirements, ...eventDto} = dto;
	handleNullForForm(eventDto);
	eventDto.details.forEach(detail => replaceBooleanStringWithBoolean(detail, 'text'));
	const date = new Date(dateTime);
	return {...eventDto, date, startTime: getTimeShort(date), requirements: requirements.map(r => `${r}`)};
}

/**
 * Converts a {@link EventPostDto} to the format {@link EventWizardFormType expected by the form}.
 */
export function convertDtoToWizardFormEvent(dto: EventPostDto): EventWizardFormType {
	const {dateTime, requirements, ...eventDto} = dto;
	handleNullForForm(eventDto);
	// @ts-ignore There is no date or startTime
	return {...eventDto, requirements: requirements.map(r => `${r}`)};
}

function handleNullForForm(dto: Partial<EventEditDto> | Partial<EventPostDto>) {
	replaceNullWithEmpty(dto, ['description', 'missionLength', 'missionType', 'pictureUrl']);
	replaceNullWithUndefined(dto, ['reserveParticipating']);
}
