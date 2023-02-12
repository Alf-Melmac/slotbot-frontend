import {DiscordUserDto} from '../../contexts/authentication/authenticationTypes';
import {EventTypeDto} from '../event/eventTypes';

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
	eventTypes: EventTypeDto[];
}

export enum Language {
	DE = 'DE',
	EN = 'EN'
}

export interface UserInGuildDto {
	user: DiscordUserDto;
}
