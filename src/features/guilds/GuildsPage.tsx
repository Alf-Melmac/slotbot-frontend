import {GuildsNavbar} from './GuildsNavbar';
import {Container} from '@mantine/core';
import {Nav} from '../../components/nav/Nav';
import {SpotlightProvider} from '@mantine/spotlight';
import {voidFunction} from '../../hooks/slotbotServerClient';
import {useLanguage} from '../../contexts/language/Language';
import {Outlet} from 'react-router-dom';

/**
 * ID of the default spotlight action
 */
export const SPOTLIGHT_LOADING = "loading-spotlight";

export function GuildsPage(): JSX.Element {
	const {t} = useLanguage();

	return (
		<SpotlightProvider actions={[{id: SPOTLIGHT_LOADING, title: t('loading'), onTrigger: voidFunction}]}
						   shortcut={['mod + K']} highlightQuery>
			<Nav navbar={<GuildsNavbar/>}>
				<Container>
					<Outlet/>
				</Container>
			</Nav>
		</SpotlightProvider>
	);
}
