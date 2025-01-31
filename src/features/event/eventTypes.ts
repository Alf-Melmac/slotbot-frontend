import {AbstractIdEntityDto, FrontendIdDto} from '../../contexts/sharedTypes';
import {GuildDto} from '../guilds/guildTypes';
import {RequirementListDto} from '../guilds/guild/config/requirement/requirementTypes';

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
	requirements: RequirementListDto[];
}

export interface EventTypeDto extends AbstractIdEntityDto {
	name: string;
	color: string;
	guild?: string;
}

export interface EventFieldReferencelessDto extends AbstractIdEntityDto {
	title: string;
	text: string;
	link: string;
}

interface EventDetailsSquadDto extends AbstractIdEntityDto {
	name: string;
	reservedFor: GuildDto;
	slotList: EventDetailsSlotDto[];
	requirements: RequirementListDto[];
}

interface EventDetailsSlotDto extends AbstractIdEntityDto {
	name: string;
	number: number;
	reservedFor: GuildDto;
	text: string;
	requirements: RequirementListDto[];
	slottable: SlottableDto;
}

interface SlottableDto {
	state: SlottableState;
	requirementsNotMet: RequirementListDto[];
}

export enum SlottableState {
	YES = "YES",
	YES_OWN = "YES_OWN",
	YES_REQUIREMENTS_NOT_MET = "YES_REQUIREMENTS_NOT_MET",
	NO = "NO",
	NO_BLOCKED = "NO_BLOCKED",
	NO_RESERVED = "NO_RESERVED",
	NO_REQUIREMENTS_NOT_MET = "NO_REQUIREMENTS_NOT_MET",
	NO_BANNED = "NO_BANNED",
	NOT_AVAILABLE = "NOT_AVAILABLE"
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
	requirements: number[];
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
	requirements: number[];
}

export interface SlotDto extends FrontendIdDto {
	name: string;
	number: number;
	reservedFor?: string;
	requirements: number[];
	blocked: boolean;
	replacementText?: string;
}

//endregion event post

//region event edit
export interface EventUpdateDto extends EventActionDto {
	details: EventFieldIdDto[];
	squadList: SquadIdDto[];
}

interface EventFieldIdDto extends Omit<EventFieldDto, 'id'>, IdEntity {
}

interface SquadIdDto extends AbstractIdEntityDto {
	name: string;
	slotList: SlotIdDto[];
	reservedFor: string;
	requirements: number[];
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
