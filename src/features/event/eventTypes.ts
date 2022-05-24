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

interface EventTypeDto extends AbstractIdEntityDto {
	name: string;
	color: string;
}

export interface EventFieldReferencelessDto extends AbstractIdEntityDto {
	title: string;
	text: string;
	link: string;
}

interface AbstractIdEntityDto {
	id: number;
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
