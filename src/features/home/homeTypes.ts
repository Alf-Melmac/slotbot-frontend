import {AbstractIdEntityDto} from '../../contexts/sharedTypes';

export interface BlogPostDto extends AbstractIdEntityDto {
	content: string;
	pinned: boolean;
	timestamp: Date;
}
