import {Accordion, Box, Stack, Title} from '@mantine/core';
import {T} from '../../../components/T';
import {useGetGuildConfig} from './useGetGuild';
import {GuildEventTypes} from './GuildEventTypes';
import {GuildLanguage} from './config/GuildLanguage';
import {GuildArchive} from './config/GuildArchive';
import {useGuildPage} from '../../../contexts/guild/GuildPageContext';

export function GuildConfig(): JSX.Element {
	const {guildId} = useGuildPage();
	const guildConfigQuery = useGetGuildConfig(guildId);
	const guildConfig = guildConfigQuery.data;
	if (guildConfigQuery.isLoading || !guildConfig) return <></>;

	return <>
		<Title order={3}><T k={'configuration'}/></Title>
		<Accordion variant={'separated'} mt={8}>
			<Accordion.Item value={'integration.discord'}>
				<Accordion.Control><T k={'integration.discord'}/></Accordion.Control>
				<Accordion.Panel>
					<Stack>
						<Box>
							<Title order={4}><T k={'language'}/></Title>
							<GuildLanguage {...guildConfig}/>
						</Box>
						<Box>
							<Title order={4}><T k={'integration.discord'}/></Title>
							<GuildArchive {...guildConfig}/>
						</Box>
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


		<Title order={3} mt={'lg'}><T k={'members'}/></Title>
	</>;
}
