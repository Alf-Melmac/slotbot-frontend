import {DiscordUserDto} from '../../contexts/authentication/authenticationTypes';
import {AbstractIdEntityDto, FrontendIdEntityDto} from '../../contexts/sharedTypes';

export interface UserProfileDto {
	user: DiscordUserDto;
	roles: string;
	participatedEventsCount: number;
	lastEvent: LastEventInfo;
	ownProfile: boolean;
}

interface LastEventInfo extends AbstractIdEntityDto {
	daysSince: number;
}

export interface UserOwnProfileDto {
	steamId64?: string;
	notificationSettings: NotificationSettings[];
	externalCalendarIntegrationActive: boolean;
	icsCalendarUrl: string;
}

interface NotificationSettings extends FrontendIdEntityDto {
	hoursBeforeEvent: number;
	minutesBeforeEvent: number;
}
