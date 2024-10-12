import {AbstractIdEntityDto, FrontendIdDto} from '../../contexts/sharedTypes';
import {GuildDto} from '../guilds/guildTypes';

//region event details
export interface EventDetailsDto extends AbstractIdEntityDto {
	hidden: boolean;
	ownerGuildIdentifier: string;
	missionType: string;
	eventType: EventTypeDto;
	pictureUrl: string;
	name: string;
	missionLength: string;
	dateTime: Date;
	descriptionAsHtml: string;
	creator: string;
	squadList: EventDetailsSquadDto[];
	details: EventFieldReferencelessDto[];
}

export interface EventTypeDto {
	name: string;
	color: string;
	guild?: string;
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
}

interface EventDetailsSlotDto extends AbstractIdEntityDto {
	name: string;
	number: number;
	reservedFor: GuildDto;
	text: string;
	occupied: boolean;
	blocked: boolean;
	own: boolean;
	slottable: boolean | null;
}

//endregion event details

interface EventActionDto {
	hidden: boolean;
	shareable: boolean;
	name: string;
	dateTime: string;
	creator: string;
	eventType: EventTypeDto;
	description: string;
	missionType: string;
	missionLength: string;
	pictureUrl: string;
	reserveParticipating?: boolean;
}

//region event post
export interface EventPostDto extends EventActionDto {
	details: EventFieldDto[];
	squadList: SquadDto[];
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

//endregion event post

//region event edit
interface EventUpdateDto extends EventActionDto {
	details: EventFieldIdDto[];
	squadList: SquadIdDto[];
}

interface EventFieldIdDto extends Omit<EventFieldDto, 'id'>, IdEntity {
}

interface SquadIdDto extends AbstractIdEntityDto {
	name: string;
	slotList: SlotIdDto[];
	reservedFor: string;
}

export interface SlotIdDto extends Omit<SlotDto, 'id'>, IdEntity {
}

export interface EventEditDto extends EventUpdateDto {
	ownerGuild: string;
	canRevokeShareable: boolean;
	canUploadSlotlist: boolean;
}

//endregion event edit

//region calendar
export interface CalendarEventDto extends AbstractIdEntityDto {
	title: string;
	start: Date;
	color: string;
	shortInformation: ShortEventInformationDto;
}

interface ShortEventInformationDto {
	emptySlotsCount: number;
	slotCount: number;
	emptyReserveSlotsCount: number;
	missionLength: string;
}
//endregion calendar

export interface IdEntity {
	id: number;
}
