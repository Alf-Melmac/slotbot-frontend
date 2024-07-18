import {JSX, Ref, useEffect, useRef, useState} from 'react';
import {Card, Group, Text, useMantineTheme} from '@mantine/core';
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
import {InfiniteData, useMutation, useQueryClient} from '@tanstack/react-query';
import slotbotServerClient from '../../../hooks/slotbotServerClient';
import {AxiosError} from 'axios';
import {FrontendPageable} from '../../../utils/pagination';

type HomeBlogItemProps = {
	post: BlogPostDto;
	inViewportRef?: Ref<HTMLDivElement>;
};

export function HomeBlogItem(props: Readonly<HomeBlogItemProps>): JSX.Element {
	const {post, inViewportRef} = props;

	const contentRef = useRef<HTMLParagraphElement>(null);
	const {spacing} = useMantineTheme();
	useEffect(() => {
		if (!contentRef.current) return;

		const htmlElement: HTMLElement | null = contentRef.current.querySelector('p > :is(img)');
		if (!htmlElement) return;
		if (htmlElement.previousSibling == null) { //img is the first element
			htmlElement.style.marginTop = spacing.md;
		}
		if (htmlElement.nextSibling == null) { //img is the last element
			htmlElement.style.marginBottom = spacing.xs; //The text root grows a bit bigger than the content
		}
	}, [post.content]);

	const {hovered, ref: hoverRef} = useHover();
	const {focused, ref: focusRef} = useFocusWithin();
	const mergedRef = useMergedRef(hoverRef, focusRef, inViewportRef);

	const isAdmin = useCheckAccess(ApplicationRoles.ROLE_ADMIN);

	const [editMode, setEditMode] = useState(false);
	const queryClient = useQueryClient();
	const updateBlogPost = (content: string) => slotbotServerClient.put(`/blog/${post.id}`, content, {headers: {'Content-Type': 'text/plain'}})
		.then((res) => res.data);
	const {mutate, isPending} = useMutation<BlogPostDto, AxiosError, string>({
		mutationFn: updateBlogPost,
		onSuccess: (data) => {
			queryClient.setQueryData<InfiniteData<FrontendPageable<BlogPostDto>>>(['blogPosts'], (oldData) => {
				if (!oldData) {
					return oldData;
				}

				const newPages = [...oldData.pages];
				for (let i = 0; i < newPages.length; i++) {
					const page = newPages[i];
					const index = page.content.findIndex((post) => post.id === data.id);
					if (index !== -1) {
						newPages[i] = {
							...page,
							content: page.content.map((item, itemIndex) => itemIndex === index ? data : item),
						};
						break;
					}
				}
				return {
					...oldData,
					pages: newPages,
				};
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
					<Text dangerouslySetInnerHTML={{__html: post.content}} ref={contentRef}/>
				</>
				:
				<BlogPostInput content={post.content}
							   onSave={mutate} isSaving={isPending}
							   onCancel={() => setEditMode(false)}/>
			}
		</Card>
	);
}
