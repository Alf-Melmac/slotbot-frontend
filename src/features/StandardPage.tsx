import {Container} from '@mantine/core';
import {Nav} from '../components/nav/Nav';
import {Outlet} from 'react-router-dom';

export function StandardPage(): JSX.Element {
	return (
		<Nav>
			<Container>
				<Outlet/>
			</Container>
		</Nav>
	);
}
