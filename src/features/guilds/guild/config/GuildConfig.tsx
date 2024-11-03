import {Box, Paper, Stack, Title} from '@mantine/core';
import {T} from '../../../../components/T';
import {useGetGuild, useGetGuildConfig} from '../useGetGuild';
import {GuildEventTypes} from './GuildEventTypes';
import {GuildLanguage} from './discord/GuildLanguage';
import {GuildArchive} from './discord/GuildArchive';
import {GuildPageProvider} from '../../../../contexts/guild/GuildPageContext';
import {GuildRoles} from './discord/GuildRoles';
import {JSX, PropsWithChildren, useEffect} from 'react';
import {GuildDiscordConfig} from './discord/GuildDiscordConfig';
import {useDynamicDocumentTitleForItem} from '../../../../hooks/useDocumentTitle';
import {useParams} from 'react-router-dom';
import {GuildPageParams} from '../../GuildRoutes';
import {NotFoundPage} from '../../../error/ErrorRoutes';
import {Breadcrumb} from '../../../../components/Breadcrumb';
import classes from './GuildConfig.module.css';
import {TextKey} from '../../../../contexts/language/Language';
import {GuildBans} from './GuildBans';
import {GuildConfigLoading} from './GuildConfigLoading';

export default function GuildConfig(): JSX.Element {
	const setTitle = useDynamicDocumentTitleForItem('documentTitle.edit.item', 'documentTitle.guild');
	const {guildId} = useParams<GuildPageParams>();
	if (!guildId) throw Error('Invalid state: Guild id required');

	const {data: guild, isError: isGuildError} = useGetGuild(guildId);
	useEffect(() => {
		if (guild) {
			setTitle(guild.groupIdentifier);
		}
	}, [guild?.groupIdentifier]);

	const {data: guildConfig, isLoading: isConfigLoading, isError: isConfigError} = useGetGuildConfig(guildId);

	if (isGuildError || isConfigError) return <NotFoundPage/>;
	if (isConfigLoading || !guildConfig || !guild) return <GuildConfigLoading/>;

	const breadcrumbItems = [
		{
			title: 'breadcrumb.guilds',
			href: '/guilds',
		},
		{
			title: guild.groupIdentifier,
			staticTitle: true,
			href: `/guilds/${guildId}`,
		},
		{
			title: 'guild.manage',
		},
	];

	return <>
		<Breadcrumb items={breadcrumbItems}/>

		<Stack gap={'lg'}>
			<Box>
				<Title order={1}><T k={'configuration'}/></Title>
				<T k={'configuration.description'}/>
			</Box>

			<GuildPageProvider guildId={guildId} isAdmin={true}>
				<ConfigItem title={'integration.discord'}>
					<Stack>
						<GuildLanguage {...guildConfig}/>
						<GuildDiscordConfig>
							<GuildArchive {...guildConfig}/>
							<GuildRoles {...guildConfig}/>
						</GuildDiscordConfig>
					</Stack>
				</ConfigItem>

				<ConfigItem title={'event.eventTypes'}>
					<GuildEventTypes/>
				</ConfigItem>

				<ConfigItem title={'guild.bans'}>
					<GuildBans/>
				</ConfigItem>
			</GuildPageProvider>
		</Stack>
	</>;
}

type ConfigItemProps = {
	title: TextKey;
}

function ConfigItem(props: Readonly<PropsWithChildren<ConfigItemProps>>): JSX.Element {
	return <Stack gap={'xs'}>
		<Title order={2} size={'h3'}><T k={props.title}/></Title>
		<Paper p={'md'} withBorder className={classes.card}>
			{props.children}
		</Paper>
	</Stack>;
}
