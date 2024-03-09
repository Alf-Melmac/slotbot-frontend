import {Container} from '@mantine/core';
import {Nav} from '../components/nav/Nav';
import {Outlet} from 'react-router-dom';
import {JSX} from 'react';

export function StandardPage(): JSX.Element {
	return (
		<Nav>
			<Container py={'md'}>
				<Outlet/>
			</Container>
		</Nav>
	);
}
