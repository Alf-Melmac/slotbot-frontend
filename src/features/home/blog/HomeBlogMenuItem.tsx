import {Dispatch, JSX, SetStateAction} from 'react';
import {ActionIcon, Menu} from '@mantine/core';
import cx from 'clsx';
import classes from './HomeBlogItem.module.css';
import styleUtils from '../../../utils/styleUtils.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faEllipsis, faThumbTack, faThumbTackSlash, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {T} from '../../../components/T';
import {BlogPostDto} from '../homeTypes';
import slotbotServerClient, {voidFunction} from '../../../hooks/slotbotServerClient';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosError} from 'axios';

type HomeBlogMenuItemProps = {
	post: BlogPostDto;
	show: boolean;
	setEditMode: Dispatch<SetStateAction<boolean>>;
};

export function HomeBlogMenuItem(props: Readonly<HomeBlogMenuItemProps>): JSX.Element {
	const {post, show, setEditMode} = props;

	const queryClient = useQueryClient();
	const putBlogPostPin = () => slotbotServerClient.put(`/blog/${post.id}/pin`).then(voidFunction);
	const {mutate: pinBlogPost} = useMutation<void, AxiosError>({
		mutationFn: putBlogPostPin,
		onSuccess: () => {
			//Invalidate everything as we don't know if there was another one unpinned
			queryClient.invalidateQueries({queryKey: ['blogPosts']});
		},
	});
	const putBlogPostUnpin = () => slotbotServerClient.put(`/blog/${post.id}/unpin`).then(voidFunction);
	const {mutate: unpinBlogPost} = useMutation<void, AxiosError>({
		mutationFn: putBlogPostUnpin,
		onSuccess: () => {
			//Invalidate everything as we don't know where to put the unpinned post
			queryClient.invalidateQueries({queryKey: ['blogPosts']});
		},
	});
	const deleteBlogPost = () => slotbotServerClient.delete(`/blog/${post.id}`).then(voidFunction);
	const {mutate: deleteBlogPostMutation} = useMutation<void, AxiosError>({
		mutationFn: deleteBlogPost,
		onSuccess: () => {
			//For the moment just invalidate everything. Optimistic updates are a bit more complicated
			queryClient.invalidateQueries({queryKey: ['blogPosts']});
		},
	});

	return <Menu withinPortal={false}>
		<Menu.Target>
			<ActionIcon variant={'light'} className={cx(classes.actionGroup, show && styleUtils.visuallyHidden)}>
				<FontAwesomeIcon icon={faEllipsis}/>
			</ActionIcon>
		</Menu.Target>

		<Menu.Dropdown>
			<Menu.Item leftSection={<FontAwesomeIcon icon={faEdit}/>} onClick={() => setEditMode(true)}>
				<T k={'action.edit'}/>
			</Menu.Item>
			{post.pinned ?
				<Menu.Item leftSection={<FontAwesomeIcon icon={faThumbTackSlash}/>} onClick={() => unpinBlogPost()}>
					<T k={'home.blog.unpin'}/>
				</Menu.Item>
				:
				<Menu.Item leftSection={<FontAwesomeIcon icon={faThumbTack}/>} onClick={() => pinBlogPost()}>
					<T k={'home.blog.pin'}/>
				</Menu.Item>
			}
			<Menu.Item leftSection={<FontAwesomeIcon icon={faTrashCan}/>} onClick={() => deleteBlogPostMutation()}>
				<T k={'action.delete'}/>
			</Menu.Item>
		</Menu.Dropdown>
	</Menu>;
}
