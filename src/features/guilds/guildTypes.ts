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

export interface UserInGuildDto {
	user: DiscordUserDto;
}
