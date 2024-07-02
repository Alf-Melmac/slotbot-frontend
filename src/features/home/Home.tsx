import {JSX} from 'react';
import {Collapse, Group, Stack} from '@mantine/core';
import {HomeEventList} from './HomeEventList';
import {HomeBlog} from './blog/HomeBlog';
import {useDisclosure} from '@mantine/hooks';
import {useCheckAccess} from '../../contexts/authentication/useCheckAccess';
import {ApplicationRoles} from '../../contexts/authentication/authenticationTypes';
import {AddButton} from '../../components/Button/AddButton';
import {AddBlogPost} from './blog/AddBlogPost';

export function Home(): JSX.Element {
	const [opened, {toggle}] = useDisclosure(false);

	return (
		<Group align={'start'} grow>
			<Stack>
				{useCheckAccess(ApplicationRoles.ROLE_ADMIN) &&
                    <>
                        <AddButton label={'home.blog.add'} onClick={toggle}/>
                        <Collapse in={opened}>
                            <AddBlogPost onSuccess={toggle}/>
                        </Collapse>
                    </>
				}
				<HomeBlog/>
			</Stack>

			<HomeEventList/>
		</Group>
	);
}
