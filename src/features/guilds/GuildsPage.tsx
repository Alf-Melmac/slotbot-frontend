import {GuildsNavbar} from './GuildsNavbar';
import {Container} from '@mantine/core';
import {Nav} from '../../components/nav/Nav';
import {SpotlightAction, SpotlightProvider} from '@mantine/spotlight';
import {voidFunction} from '../../hooks/slotbotServerClient';
import {useLanguage} from '../../contexts/language/Language';
import {Outlet} from 'react-router-dom';
import {JSX, useState} from 'react';

/**
 * ID of the default spotlight action
 */
export const SPOTLIGHT_LOADING = 'loading-spotlight';

export function GuildsPage(): JSX.Element {
	const {t} = useLanguage();
	const [actions, setActions] = useState<SpotlightAction[]>([{id: SPOTLIGHT_LOADING, title: t('loading'), onTrigger: voidFunction, closeOnTrigger: false}]);

	return (
		<SpotlightProvider actions={actions} shortcut={['mod + K']} highlightQuery>
			<Nav navbar={<GuildsNavbar setActions={setActions}/>}>
				<Container>
					<Outlet/>
				</Container>
			</Nav>
		</SpotlightProvider>
	);
}
