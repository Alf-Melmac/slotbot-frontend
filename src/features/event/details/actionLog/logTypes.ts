import {DiscordUserDto} from '../../../../contexts/authentication/authenticationTypes';

export interface ActionLogDto {
	id: number;
	action: LogAction;
	timeGap: string;
	user: DiscordUserDto;
}

export enum LogAction {
	SLOT = 'SLOT',
	UNSLOT = 'UNSLOT',
	SWAP = 'SWAP',
}
