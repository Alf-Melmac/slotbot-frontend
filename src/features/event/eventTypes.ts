export interface EventDetailsDto extends AbstractEventDto {
	channelUrl: string;
	details: EventFieldReferencelessDto[];
	squadList: EventDetailsSquadDto[];
}

interface AbstractEventDto extends AbstractIdEntityDto {
	hidden: boolean;
	shareable: boolean;
	name: string;
	date: Date;
	startTime: Date;
	creator: string;
	eventType: EventTypeDto;
	description: string;
	missionType: string;
	missionLength: string;
	pictureUrl: string;
	reserveParticipating: boolean;
	discordInformation: EventDiscordInformationDto[];
	ownerGuild: string;
	rawPictureUrl: string;
	missionTypesFiltered: string[];
	dateTimeZoned: Date;
}

interface EventTypeDto extends AbstractIdEntityDto {
	name: string;
	color: string;
}

interface EventDiscordInformationDto {
	channel: string;
	guild: string;
	infoMsg: string;
	slotListMsgPartOne: string;
	slotListMsgPartTwo: string;
	channelUrl: string;
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

interface GuildDto {
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
