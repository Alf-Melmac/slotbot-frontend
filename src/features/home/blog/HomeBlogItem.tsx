import {JSX, useState} from 'react';
import {Card, Group, Text} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {BlogPostDto} from '../homeTypes';
import {faThumbTack} from '@fortawesome/free-solid-svg-icons';
import {T} from '../../../components/T';
import {useFocusWithin, useHover, useMergedRef} from '@mantine/hooks';
import {HomeBlogMenuItem} from './HomeBlogMenuItem';
import {useCheckAccess} from '../../../contexts/authentication/useCheckAccess';
import {ApplicationRoles} from '../../../contexts/authentication/authenticationTypes';
import classes from './HomeBlogItem.module.css';
import {BlogPostInput} from './BlogPostInput';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import slotbotServerClient from '../../../hooks/slotbotServerClient';
import {AxiosError} from 'axios';

type HomeBlogItemProps = {
	post: BlogPostDto;
};

export function HomeBlogItem(props: Readonly<HomeBlogItemProps>): JSX.Element {
	const {post} = props;

	const {hovered, ref: hoverRef} = useHover();
	const {focused, ref: focusRef} = useFocusWithin();
	const mergedRef = useMergedRef(hoverRef, focusRef);

	const isAdmin = useCheckAccess(ApplicationRoles.ROLE_ADMIN);

	const [editMode, setEditMode] = useState(false);
	const queryClient = useQueryClient();
	const updateBlogPost = (content: string) => slotbotServerClient.put(`/blog/${post.id}`, content, {headers: {'Content-Type': 'text/plain'}})
		.then((res) => res.data);
	const {mutate, isPending} = useMutation<BlogPostDto, AxiosError, string>({
		mutationFn: updateBlogPost,
		onSuccess: (data) => {
			queryClient.setQueryData(['blogPosts'], (posts: BlogPostDto[]) => {
				const index = posts.findIndex((p) => p.id === data.id);
				const newPosts = [...posts];
				newPosts[index] = data;
				return newPosts;
			});
			setEditMode(false);
		},
	});

	return (
		<Card withBorder py={0} className={isAdmin ? classes.adminCard : undefined} ref={mergedRef}>
			{post.pinned &&
                <Group pt={'sm'} gap={'xs'} wrap={'nowrap'} c={'dimmed'}>
                    <FontAwesomeIcon icon={faThumbTack} size={'xs'}/>
                    <Text size={'sm'}><T k={'home.blog.pinned'}/></Text>
                </Group>
			}
			{!editMode ?
				<>
					{isAdmin &&
                        <HomeBlogMenuItem post={post} show={!hovered && !focused} setEditMode={setEditMode}/>
					}
					<Text dangerouslySetInnerHTML={{__html: post.content}}/>
				</>
				:
				<BlogPostInput content={post.content}
							   onSave={mutate} isSaving={isPending}
							   onCancel={() => setEditMode(false)}/>
			}
		</Card>
	);
}
