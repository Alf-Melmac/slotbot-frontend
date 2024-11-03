import {DiscordUserDto} from '../../contexts/authentication/authenticationTypes';

export interface GuildDto {
	id: string;
	groupIdentifier: string;
	emojiUrl?: string;
}

export interface GuildDetailsDto extends AbstractDiscordIdEntityDto {
	advanced: boolean;
	baseUrl?: string;
	groupIdentifier: string;
	emojiUrl?: string;
}

interface AbstractDiscordIdEntityDto {
	id: string;
}

export interface GuildConfigDto {
	language: Language;
	archiveChannel: string;
	memberRole: string;
	eventManageRole: string;
	adminRole: string;
}

export enum Language {
	DE = 'DE',
	EN = 'EN'
}

export interface GuildDiscordIntegrationDto {
	connected: boolean;
	categories: DiscordCategory[];
	allowedToManageRoles: boolean;
	roles: DiscordRole[];
}

interface DiscordCategory {
	name: string;
	textChannels: DiscordTextChannel[];
}

interface DiscordTextChannel {
	id: string;
	name: string;
}

interface DiscordRole {
	id: string;
	name: string;
}

export enum Role {
	SYSTEM_ADMIN = 'SYSTEM_ADMIN',
	ADMINISTRATOR = 'ADMINISTRATOR',
	EVENT_MANAGE = 'EVENT_MANAGE',
}

export interface UserInGuildDto {
	user: DiscordUserDto;
	role: Role;
}

export interface GuildBanDto {
	user: DiscordUserDto;
	reason: string;
	bannedAt: Date;
}
