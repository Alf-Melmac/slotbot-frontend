import {Box, Paper, Stack, Title} from '@mantine/core';
import {T} from '../../../../components/T';
import {useGetGuild, useGetGuildConfig} from '../useGetGuild';
import {GuildEventTypes} from './eventTypes/GuildEventTypes';
import {GuildPageProvider} from '../../../../contexts/guild/GuildPageContext';
import {JSX, PropsWithChildren, useEffect} from 'react';
import {useDynamicDocumentTitleForItem} from '../../../../hooks/useDocumentTitle';
import {useParams} from 'react-router';
import {GuildPageParams} from '../../GuildRoutes';
import {NotFoundPage} from '../../../error/ErrorRoutes';
import {Breadcrumb} from '../../../../components/Breadcrumb';
import classes from './GuildConfig.module.css';
import {TextKey} from '../../../../contexts/language/Language';
import {GuildBans} from './GuildBans';
import {GuildConfigLoading} from './GuildConfigLoading';
import {GuildRequirementList} from './requirement/GuildRequirementList';
import {RequireFeatureFlag} from '../../../featureFlag/RequireFeatureFlag';
import {FeatureFlag} from '../../../featureFlag/useGetFeatureFlags';
import {PreviewBadge} from '../../../featureFlag/PreviewBadge';
import {GuildDiscordIntegrationConfig} from './discord/GuildDiscordIntegrationConfig';

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
				<RequireFeatureFlag feature={FeatureFlag.REQUIREMENTS}>
					<ConfigItem title={'guild.requirementList'} description={'guild.requirementList.description'}
								preview>
						<GuildRequirementList/>
					</ConfigItem>
				</RequireFeatureFlag>

				<ConfigItem title={'event.eventTypes'}>
					<GuildEventTypes/>
				</ConfigItem>

				<ConfigItem title={'guild.bans'}>
					<GuildBans/>
				</ConfigItem>

				<ConfigItem title={'integration.discord'}>
					<GuildDiscordIntegrationConfig {...guildConfig}/>
				</ConfigItem>
			</GuildPageProvider>
		</Stack>
	</>;
}

type ConfigItemProps = {
	title: TextKey;
	description?: TextKey;
	preview?: boolean;
}

function ConfigItem(props: Readonly<PropsWithChildren<ConfigItemProps>>): JSX.Element {
	return <Stack gap={'xs'}>
		<Title order={2}><T k={props.title}/>{props.preview && <PreviewBadge ml={'md'}/>}</Title>
		{props.description &&
            <T k={props.description}/>
		}
		<Paper p={'md'} withBorder className={classes.card}>
			{props.children}
		</Paper>
	</Stack>;
}
