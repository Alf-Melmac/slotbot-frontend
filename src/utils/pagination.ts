interface FrontendPage {
	size: number;
	totalElements: number;
	totalPages: number;
	number: number;
}

export interface FrontendPageable<T> {
	page: FrontendPage;
	content: T[];
}
