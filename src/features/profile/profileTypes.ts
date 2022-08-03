import {DiscordUserDto} from '../user/authenticationTypes';

export interface UserProfileDto {
	user: DiscordUserDto;
	roles: string;
	participatedEventsCount: number;
	ownProfile: boolean;
	steamId64?: string;
}
