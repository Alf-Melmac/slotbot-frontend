import {JSX, useCallback, useEffect, useRef, useState} from 'react';
import {HomeBlogItem} from './HomeBlogItem';
import slotbotServerClient from '../../../hooks/slotbotServerClient';
import {QueryFunction, QueryKey, useInfiniteQuery} from '@tanstack/react-query';
import {BlogPostDto} from '../homeTypes';
import {GeneralError} from '../../../components/error/GeneralError';
import {FrontendPageable} from '../../../utils/pagination';
import {HomeBlogLoading} from './HomeBlogLoading';
import {Stack, Text} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHelicopterSymbol} from '@fortawesome/free-solid-svg-icons';
import {T} from '../../../components/T';
import {useDocumentTitle} from '@mantine/hooks';
import {useGuildContext} from '../../../contexts/guildcontext/GuildContext';

export function HomeBlog(): JSX.Element {
	useDocumentTitle('Slotbot');
	const {guildUrlPath} = useGuildContext();

	const getBlogPosts: QueryFunction<FrontendPageable<BlogPostDto>, QueryKey, unknown> = ({pageParam}) => slotbotServerClient
		.get(`/blog${guildUrlPath}?size=5&page=${pageParam}`)
		.then((res) => res.data);
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isError,
		error,
	} = useInfiniteQuery<FrontendPageable<BlogPostDto>, Error>({
		queryKey: ['blogPosts'],
		queryFn: getBlogPosts,
		initialPageParam: 0,
		getNextPageParam: (lastPage) => {
			const {totalPages, number} = lastPage.page;
			if (number < totalPages - 1) {
				return number + 1;
			}
			return undefined;
		},
	});

	const [flatData, setFlatData] = useState<BlogPostDto[]>([]);
	useEffect(() => {
		setFlatData(data?.pages.flatMap((page) => page.content) ?? []);
	}, [data]);

	const observer = useRef<IntersectionObserver | null>(null);
	const lastElementRef = useCallback((node: HTMLDivElement) => {
		if (observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting && !isFetching && hasNextPage) {
				fetchNextPage();
			}
		});
		if (node) observer.current.observe(node);
	}, [fetchNextPage, isFetching, hasNextPage]);

	if (isError) return <GeneralError error={error}/>;

	return <>
		{flatData.map((post, index) => (
			<HomeBlogItem key={post.id} post={post}
						  inViewportRef={(hasNextPage && index == flatData.length - 1) ? lastElementRef : undefined}/>
		))}
		{isFetching && <HomeBlogLoading/>}

		{!isFetching && !flatData.length && <Stack align={'center'}>
            <FontAwesomeIcon icon={faHelicopterSymbol} size={'8x'}/>
            <Text size={'lg'}><T k={'home.blog.empty'}/></Text>
        </Stack>}
	</>;
}
