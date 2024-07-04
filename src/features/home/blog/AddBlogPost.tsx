import {JSX} from 'react';
import slotbotServerClient from '../../../hooks/slotbotServerClient';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {BlogPostDto} from '../homeTypes';
import {BlogPostInput} from './BlogPostInput';

type AddBlogPostProps = {
	onSuccess: () => void;
};

export function AddBlogPost(props: Readonly<AddBlogPostProps>): JSX.Element {
	const queryClient = useQueryClient();
	const postBlogPost = (content: string) => slotbotServerClient.post('/blog', content, {headers: {'Content-Type': 'text/plain'}})
		.then((res) => res.data);
	const {mutate, isPending} = useMutation<BlogPostDto, AxiosError, string>({
		mutationFn: postBlogPost,
		onSuccess: (data) => {
			queryClient.setQueryData(['blogPosts'], (posts: BlogPostDto[]) => {
				const firstNotPinned = posts.findIndex(post => !post.pinned);

				if (firstNotPinned === -1) {
					return [data, ...posts];
				}

				const before = posts.slice(0, firstNotPinned);
				const after = posts.slice(firstNotPinned);

				return [...before, data, ...after];
			});
			props.onSuccess();
		},
	});

	return <BlogPostInput onSave={mutate} isSaving={isPending}/>;
}
