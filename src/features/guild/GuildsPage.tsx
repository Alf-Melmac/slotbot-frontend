import {GuildsNavbar} from './GuildsNavbar';
import {Container} from '@mantine/core';
import {Nav} from '../../components/nav/Nav';
import {PropsWithChildren} from 'react';

type GuildsPageProps = {
	guildId?: string;
}

export function GuildsPage(props: PropsWithChildren<GuildsPageProps>): JSX.Element {
	const {guildId, children} = props;

	return (
		<Nav navbar={<GuildsNavbar guildId={guildId}/>}>
			<Container>
				{children}
			</Container>
		</Nav>
	);
}
