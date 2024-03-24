import {useGetDiscordIntegration} from '../../useGetGuild';
import {useGuildPage} from '../../../../../contexts/guild/GuildPageContext';
import {JSX, PropsWithChildren} from 'react';
import {Button} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDiscord} from '@fortawesome/free-brands-svg-icons';
import {AnchorBlank} from '../../../../../components/Text/AnchorBlank';
import {T} from '../../../../../components/T';
import {GuildDiscordConfigProvider} from '../../../../../contexts/guild/GuildDiscordConfigContext';

export function GuildDiscordConfig(props: Readonly<PropsWithChildren>): JSX.Element {
	const {guildId} = useGuildPage();
	const integrationQuery = useGetDiscordIntegration(guildId);

	return <>
		{integrationQuery.data?.connected === false ?
			<Button color={'blue'} mt={3}
					leftSection={<FontAwesomeIcon icon={faDiscord}/>}
					component={AnchorBlank} href={'https://slotbot.de/invite'}>
				<T k={'integration.discord.invite'}/>
			</Button>
			:
			<GuildDiscordConfigProvider {...integrationQuery}>
				{props.children}
			</GuildDiscordConfigProvider>
		}
	</>;
}
