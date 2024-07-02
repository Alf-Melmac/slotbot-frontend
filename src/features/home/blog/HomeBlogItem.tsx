import {JSX} from 'react';
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

type HomeBlogItemProps = {
	post: BlogPostDto;
};

export function HomeBlogItem(props: Readonly<HomeBlogItemProps>): JSX.Element {
	const {post} = props;
	const {hovered, ref: hoverRef} = useHover();
	const {focused, ref: focusRef} = useFocusWithin();
	const mergedRef = useMergedRef(hoverRef, focusRef);

	const isAdmin = useCheckAccess(ApplicationRoles.ROLE_ADMIN);
	return (
		<Card withBorder py={0} className={isAdmin ? classes.adminCard : undefined} ref={mergedRef}>
			{post.pinned &&
                <Group pt={'sm'} gap={'xs'} wrap={'nowrap'} c={'dimmed'}>
                    <FontAwesomeIcon icon={faThumbTack} size={'xs'}/>
                    <Text size={'sm'}><T k={'home.blog.pinned'}/></Text>
                </Group>
			}
			{isAdmin &&
                <HomeBlogMenuItem post={post} show={!hovered && !focused}/>
			}
			<Text dangerouslySetInnerHTML={{__html: post.content}}/>
		</Card>
	);
}
