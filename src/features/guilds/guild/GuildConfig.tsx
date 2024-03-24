import {Accordion, Stack, Title} from '@mantine/core';
import {T} from '../../../components/T';
import {useGetGuildConfig} from './useGetGuild';
import {GuildEventTypes} from './GuildEventTypes';
import {GuildLanguage} from './config/GuildLanguage';
import {GuildArchive} from './config/GuildArchive';
import {useGuildPage} from '../../../contexts/guild/GuildPageContext';
import {GuildRoles} from './config/GuildRoles';
import {JSX} from 'react';
import {GuildDiscordConfig} from './config/discord/GuildDiscordConfig';

export function GuildConfig(): JSX.Element {
	const {guildId} = useGuildPage();
	const guildConfigQuery = useGetGuildConfig(guildId);
	const guildConfig = guildConfigQuery.data;
	if (guildConfigQuery.isLoading || !guildConfig) return <></>;

	return <>
		<Title order={2}><T k={'configuration'}/></Title>
		<Accordion variant={'separated'} mt={8}>
			<Accordion.Item value={'integration.discord'}>
				<Accordion.Control><T k={'integration.discord'}/></Accordion.Control>
				<Accordion.Panel>
					<Stack>
						<GuildLanguage {...guildConfig}/>
						<GuildDiscordConfig>
							<GuildArchive {...guildConfig}/>
							<GuildRoles {...guildConfig}/>
						</GuildDiscordConfig>
					</Stack>
				</Accordion.Panel>
			</Accordion.Item>
			<Accordion.Item value={'types'}>
				<Accordion.Control><T k={'event.eventTypes'}/></Accordion.Control>
				<Accordion.Panel>
					<GuildEventTypes/>
				</Accordion.Panel>
			</Accordion.Item>
		</Accordion>

		<Title order={2} mt={'lg'}><T k={'members'}/></Title>
	</>;
}
