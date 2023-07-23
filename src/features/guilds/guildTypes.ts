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
}

export enum Language {
	DE = 'DE',
	EN = 'EN'
}

export interface GuildDiscordIntegrationDto {
	connected: boolean;
	categories: DiscordCategory[];
}

interface DiscordCategory {
	name: string;
	textChannels: DiscordTextChannel[];
}

interface DiscordTextChannel {
	id: string;
	name: string;
}

export interface UserInGuildDto {
	user: DiscordUserDto;
}
