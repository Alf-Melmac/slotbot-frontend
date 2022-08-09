import {DiscordUserDto} from '../../contexts/authentication/authenticationTypes';

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

interface NotificationSettings {
	hoursBeforeEvent: number;
	minutesBeforeEvent: number;
}
