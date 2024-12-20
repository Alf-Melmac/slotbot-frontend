import {AbstractIdEntityDto, FrontendIdDto} from '../../../../../contexts/sharedTypes';

interface RequirementDto extends AbstractIdEntityDto {
	name: string;
	icon: string;
}

export interface RequirementListDto extends AbstractIdEntityDto {
	name: string;
	requirements: RequirementDto[];
	memberAssignable: boolean;
	enforced: boolean;
	global: boolean;
}

export interface EventTypeRequirementListDto extends AbstractIdEntityDto {
	name: string;
	requirements: RequirementDto[];
	active: boolean;
}

export interface RequirementListPostDto extends FrontendIdDto {
	name: string;
	requirements: RequirementPostDto[];
	memberAssignable: boolean;
	enforced: boolean;
}

interface RequirementPostDto extends FrontendIdDto {
	name: string;
	icon?: string;
}
