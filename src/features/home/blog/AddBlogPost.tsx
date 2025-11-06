import {JSX} from 'react';
import slotbotServerClient from '../../../hooks/slotbotServerClient';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {BlogPostDto} from '../homeTypes';
import {BlogPostInput} from './BlogPostInput';
import {useGuildContext} from '../../../contexts/guildcontext/GuildContext';

type AddBlogPostProps = {
	onSuccess: () => void;
};

export function AddBlogPost(props: Readonly<AddBlogPostProps>): JSX.Element {
	const {guildUrlPath} = useGuildContext();
	const queryClient = useQueryClient();
	const postBlogPost = (content: string) => slotbotServerClient
		.post(`/blog${guildUrlPath}`, content, {headers: {'Content-Type': 'text/plain'}})
		.then((res) => res.data);
	const {mutate, isPending} = useMutation<BlogPostDto, AxiosError, string>({
		mutationFn: postBlogPost,
		onSuccess: () => {
			//For the moment just invalidate everything. Optimistic updates are a bit more complicated
			// noinspection JSIgnoredPromiseFromCall
			queryClient.invalidateQueries({queryKey: ['blogPosts']});
			props.onSuccess();
		},
	});

	return <BlogPostInput onSave={mutate} isSaving={isPending}/>;
}
