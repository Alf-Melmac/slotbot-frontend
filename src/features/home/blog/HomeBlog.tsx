import {JSX} from 'react';
import {HomeBlogItem} from './HomeBlogItem';
import slotbotServerClient from '../../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';
import {BlogPostDto} from '../homeTypes';
import {GeneralError} from '../../../components/error/GeneralError';
import {HomeBlogLoading} from './HomeBlogLoading';

export function HomeBlog(): JSX.Element {
	const getBlogPosts = () => slotbotServerClient.get('/blog').then((res) => res.data);
	const query = useQuery<BlogPostDto[], Error>({
		queryKey: ['blogPosts'],
		queryFn: getBlogPosts,
	});

	if (query.isError) return <GeneralError error={query.error}/>;
	if (query.isLoading) return <HomeBlogLoading/>;

	return <>
		{query.data?.map((post) => (
			<HomeBlogItem key={post.id} post={post}/>
		))}
	</>;
}
