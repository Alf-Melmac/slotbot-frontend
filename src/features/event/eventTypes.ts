import {AbstractIdEntityDto, FrontendIdDto} from '../../contexts/sharedTypes';

export interface EventDetailsDto extends AbstractIdEntityDto {
	missionType: string;
	eventType: EventTypeDto;
	pictureUrl: string;
	name: string;
	missionLength: string;
	dateTimeZoned: Date;
	descriptionAsHtml: string;
	creator: string;
	squadList: EventDetailsSquadDto[];
	details: EventFieldReferencelessDto[];
}

export interface EventTypeDto {
	name: string;
	color: string;
}

export interface EventFieldReferencelessDto extends AbstractIdEntityDto {
	title: string;
	text: string;
	link: string;
}

export interface EventDetailsSquadDto extends AbstractIdEntityDto {
	name: string;
	reservedFor: GuildDto;
	slotList: EventDetailsSlotDto[];
	notEmpty: boolean;
	reserve: boolean;
}

export interface GuildDto {
	id: string;
	groupIdentifier: string;
	emojiUrl: string;
}

interface EventDetailsSlotDto extends AbstractIdEntityDto {
	name: string;
	number: number;
	reservedFor: GuildDto;
	text: string;
	occupied: boolean;
	blocked: boolean;
}

//E
export interface EventPostDto {
	hidden: boolean;
	shareable: boolean;
	name: string;
	date: Date | string;
	startTime: Date | string;
	creator: string;
	eventType: EventTypeDto;
	description: string;
	missionType: string;
	missionLength: string;
	pictureUrl: string;
	details: EventFieldDto[];
	squadList: SquadDto[];
	reserveParticipating?: boolean;
}

interface EventFieldDto extends FrontendIdDto {
	title: string;
	text: string;
}

export interface SquadDto extends FrontendIdDto {
	name: string;
	slotList: SlotDto[];
	reservedFor?: string;
}

export interface SlotDto extends FrontendIdDto {
	name: string;
	number: number;
	reservedFor?: string;
	blocked: boolean;
	replacementText?: string;
}
