import {JSX, PropsWithChildren} from 'react';
import {Divider, Grid, Stack, Text} from '@mantine/core';
import {Bold} from '../../../../../components/Text/Bold';
import {T} from '../../../../../components/T';
import {GuildLanguage} from './GuildLanguage';
import {GuildDiscordConfig} from './GuildDiscordConfig';
import {GuildArchive} from './GuildArchive';
import {GuildRoles} from './GuildRoles';
import {GuildConfigDto} from '../../../guildTypes';

export function GuildDiscordIntegrationConfig(props: Readonly<GuildConfigDto>): JSX.Element {
	const guildConfig = props;

	return <Stack>
		<Grid>
			<SettingColumns label={'guild.config.language'}>
				<GuildLanguage {...guildConfig}/>
			</SettingColumns>
		</Grid>
		<GuildDiscordConfig>
			<Divider/>
			<Grid>
				<SettingColumns label={'guild.config.archive'}>
					<GuildArchive {...guildConfig}/>
				</SettingColumns>
				<Grid.Col span={12}>
					<Divider/>
				</Grid.Col>
				<SettingColumns label={'guild.config.roles'}>
					<GuildRoles {...guildConfig}/>
				</SettingColumns>
			</Grid>
		</GuildDiscordConfig>
	</Stack>;
}

type IntegrationSettingProps = {
	label: string;
}

function SettingColumns({label, children}: Readonly<PropsWithChildren<IntegrationSettingProps>>): JSX.Element {
	return <>
		<Grid.Col span={7}>
			<Stack gap={0}>
				<Bold><T k={label}/></Bold>
				<Text c={'dimmed'}><T k={`${label}.description`}/></Text>
			</Stack>
		</Grid.Col>
		<Grid.Col span={5}>
			{children}
		</Grid.Col>
	</>;
}
