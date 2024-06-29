import {JSX} from 'react';
import {HomeBlogItem} from './HomeBlogItem';
import {Collapse, Stack} from '@mantine/core';
import {AddButton} from '../../components/Button/AddButton';
import {useDisclosure} from '@mantine/hooks';
import {AddBlogPost} from './AddBlogPost';
import {useCheckAccess} from '../../contexts/authentication/useCheckAccess';
import {ApplicationRoles} from '../../contexts/authentication/authenticationTypes';

export function HomeBlog(): JSX.Element {
	const [opened, {toggle}] = useDisclosure(false);
	const from = Array.from({length: 3});
	return <Stack>
		{useCheckAccess(ApplicationRoles.ROLE_ADMIN) &&
            <>
                <AddButton label={'home.blog.add'} onClick={toggle}/>
                <Collapse in={opened}>
                    <AddBlogPost/>
                </Collapse>
            </>
		}
		{from.map((_, index) => (
			<HomeBlogItem key={index}/>
		))}
	</Stack>;
}
