export interface DiscordUserDto {
	id: string;
	name: string;
	avatarUrl: string;
	authorities: Set<ApplicationRoles>;
}

export enum ApplicationRoles {
	ROLE_SYS_ADMIN = 'ROLE_SYS_ADMIN',
	ROLE_ADMIN = 'ROLE_ADMIN',
	ROLE_EVENT_MANAGE = 'ROLE_EVENT_MANAGE',
	ROLE_USER = 'ROLE_USER',
}
