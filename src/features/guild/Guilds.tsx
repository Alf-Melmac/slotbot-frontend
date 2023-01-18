import {useTranslatedDocumentTitle} from '../../hooks/useTranslatedDocumentTitle';
import {Nav} from '../../components/nav/Nav';
import {Container} from '@mantine/core';
import {GuildsNavbar} from './GuildsNavbar';
import {useState} from 'react';
import {GuildDetails} from './GuildDetails';

export function Guilds(): JSX.Element {
	useTranslatedDocumentTitle('documentTitle.guilds');
	const [guildId, setGuildId] = useState<string>();

	return (
		<Nav navbar={<GuildsNavbar guildId={guildId} setGuildId={setGuildId}/>}>
			<Container>
				{guildId &&
                    <GuildDetails guildId={guildId}/>
				}
			</Container>
		</Nav>
	);
}
