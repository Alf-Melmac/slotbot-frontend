import {JSX} from 'react';
import {Group} from '@mantine/core';
import {HomeEventList} from './HomeEventList';
import {HomeBlog} from './HomeBlog';

export function Home(): JSX.Element {
	return (
		<Group align={'start'} grow>
			<HomeBlog/>

			<HomeEventList/>
		</Group>
	);
}
