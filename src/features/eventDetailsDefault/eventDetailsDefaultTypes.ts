import {AbstractIdEntityDto, FrontendIdDto} from '../../contexts/sharedTypes';

export interface EventDetailDefaultDto extends AbstractIdEntityDto {
	title: string;
	type: EventDetailType;
	selection: string[];
	text: string;
}

export interface EventDetailDefaultPostDto extends FrontendIdDto {
	title: string;
	type: EventDetailType;
	selection: string[];
	text: string;
}

type EventDetailType = 'TEXT' | 'TEXT_WITH_SELECTION' | 'BOOLEAN';
