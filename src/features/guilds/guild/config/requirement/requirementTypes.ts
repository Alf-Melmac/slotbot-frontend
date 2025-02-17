import {AbstractIdEntityDto, FrontendIdDto} from '../../../../../contexts/sharedTypes';

export interface RequirementDto extends AbstractIdEntityDto {
	name: string;
	abbreviation: string;
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

interface ManagedRequirementDto extends RequirementDto {
	fulfilled: boolean;
}

export interface ManagedRequirementListDto {
	id: number;
	name: string;
	requirements: ManagedRequirementDto[];
}

export interface RequirementListPostDto extends FrontendIdDto {
	name: string;
	requirements: RequirementPostDto[];
	memberAssignable: boolean;
	enforced: boolean;
}

interface RequirementPostDto extends FrontendIdDto {
	name: string;
	abbreviation?: string;
	icon?: string;
}
