import {JSX} from 'react';
import {Collapse, Flex, Stack} from '@mantine/core';
import {HomeEventList} from './HomeEventList';
import {HomeBlog} from './blog/HomeBlog';
import {useDisclosure} from '@mantine/hooks';
import {useCheckAccess} from '../../contexts/authentication/useCheckAccess';
import {ApplicationRoles} from '../../contexts/authentication/authenticationTypes';
import {AddButton} from '../../components/Button/AddButton';
import {AddBlogPost} from './blog/AddBlogPost';
import classes from './Home.module.css';

export default function Home(): JSX.Element {
	const [opened, {toggle}] = useDisclosure(false);

	return (
		<Flex align={{base: 'center', sm: 'start'}} direction={{base: 'column-reverse', sm: 'row'}}
			  gap={'md'} wrap={'wrap-reverse'}>
			<Stack className={classes.homeChild}>
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
		</Flex>
	);
}
