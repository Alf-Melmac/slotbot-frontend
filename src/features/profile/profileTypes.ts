import {DiscordUserDto} from '../../contexts/authentication/authenticationTypes';
import {FrontendIdEntityDto} from '../../contexts/sharedTypes';

export interface UserProfileDto {
	user: DiscordUserDto;
	roles: string;
	participatedEventsCount: number;
	ownProfile: boolean;
}

export interface UserOwnProfileDto {
	steamId64?: string;
	notificationSettings: NotificationSettings[];
	externalCalendarIntegrationActive: boolean;
}

interface NotificationSettings extends FrontendIdEntityDto {
	hoursBeforeEvent: number;
	minutesBeforeEvent: number;
}
