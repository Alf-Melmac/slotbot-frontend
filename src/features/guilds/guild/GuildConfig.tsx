import {Accordion, Box, Stack, Title} from '@mantine/core';
import {T} from '../../../components/T';
import {GuildProps} from './Guild';
import {useGetGuildConfig} from './useGetGuild';
import {GuildEventTypes} from './GuildEventTypes';
import {GuildLanguage} from './config/GuildLanguage';
import {GuildArchive} from './config/GuildArchive';

export function GuildConfig(props: GuildProps): JSX.Element {
	const {guildId} = props;
	const guildConfigQuery = useGetGuildConfig(guildId);
	const guildConfig = guildConfigQuery.data;
	if (guildConfigQuery.isLoading || !guildConfig) return <></>;

	return <>
		<Title order={3}>Konfiguration</Title>
		<Accordion variant={'separated'} mt={8}>
			<Accordion.Item value={'integration.discord'}>
				<Accordion.Control><T k={'integration.discord'}/></Accordion.Control>
				<Accordion.Panel>
					<Stack>
						<Box>
							<Title order={4}><T k={'language'}/></Title>
							<GuildLanguage guildId={guildId} {...guildConfig}/>
						</Box>
						<Box>
							<Title order={4}><T k={'integration.discord'}/></Title>
							<GuildArchive guildId={guildId} {...guildConfig}/>
						</Box>
					</Stack>
				</Accordion.Panel>
			</Accordion.Item>
			<Accordion.Item value={'types'}>
				<Accordion.Control><T k={'event.eventTypes'}/></Accordion.Control>
				<Accordion.Panel>
					<GuildEventTypes guildId={guildId}/>
				</Accordion.Panel>
			</Accordion.Item>
		</Accordion>


		<Title order={3} mt={'lg'}>Spieler</Title>
	</>;
}
