import {FrontendIdDto} from '../../contexts/sharedTypes';

export interface EventDetailDefaultDto extends FrontendIdDto {
	title: string;
	type: EventDetailType;
	selection: string[];
	text: string;
}

export type EventDetailType = 'TEXT' | 'TEXT_WITH_SELECTION' | 'BOOLEAN';
