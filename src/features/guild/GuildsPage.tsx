import {GuildsNavbar} from './GuildsNavbar';
import {Container} from '@mantine/core';
import {Nav} from '../../components/nav/Nav';
import {PropsWithChildren} from 'react';
import {SpotlightProvider} from '@mantine/spotlight';
import {voidFunction} from '../../hooks/slotbotServerClient';
import {useLanguage} from '../../contexts/language/Language';

/**
 * ID of the default spotlight action
 */
export const SPOTLIGHT_LOADING = "loading-spotlight";

type GuildsPageProps = {
	guildId?: string;
}

export function GuildsPage(props: PropsWithChildren<GuildsPageProps>): JSX.Element {
	const {guildId, children} = props;
	const {t} = useLanguage();

	return (
		<SpotlightProvider actions={[{id: SPOTLIGHT_LOADING, title: t('loading'), onTrigger: voidFunction}]}
						   shortcut={['mod + K']} highlightQuery>
			<Nav navbar={<GuildsNavbar guildId={guildId}/>}>
				<Container>
					{children}
				</Container>
			</Nav>
		</SpotlightProvider>
	);
}
