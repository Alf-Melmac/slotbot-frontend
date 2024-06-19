import {JSX} from 'react';
import {Card, Group} from '@mantine/core';
import {HomeEventList} from './HomeEventList';

export function Home(): JSX.Element {
	return (
		<Group grow>
			<Card>Nothing</Card>

			<HomeEventList/>
		</Group>
	);
}
