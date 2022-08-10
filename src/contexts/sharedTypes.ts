export interface AbstractIdEntityDto {
	id: number;
}

/**
 * Id from backend which may be used in forms. Usually only retains existing ids and doesn't create ids for new elements.
 */
export interface FrontendIdEntityDto {
	id?: string;
}

export interface FrontendIdDto {
	id: string;
}
