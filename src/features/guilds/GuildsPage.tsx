import {GuildsNavbar} from './GuildsNavbar';
import {Container} from '@mantine/core';
import {Nav} from '../../components/nav/Nav';
import {Spotlight, SpotlightActionData} from '@mantine/spotlight';
import {voidFunction} from '../../hooks/slotbotServerClient';
import {useLanguage} from '../../contexts/language/Language';
import {Outlet} from 'react-router-dom';
import {JSX, useState} from 'react';

export function GuildsPage(): JSX.Element {
	const {t} = useLanguage();
	const [actions, setActions] = useState<SpotlightActionData[]>([{
		id: 'loading-spotlight',
		title: t('loading'),
		onClick: voidFunction,
		closeSpotlightOnTrigger: false,
	}]);

	return (
		<Spotlight actions={actions} shortcut={['mod + K']} highlightQuery>
			<Nav navbar={<GuildsNavbar setActions={setActions}/>}
				 navbarProps={{width: {xs: 200, sm: 300}, breakpoint: 'xs'}}> {/*TODO m7-5 check breakpoint*/}
				<Container>
					<Outlet/>
				</Container>
			</Nav>
		</Spotlight>
	);
}
