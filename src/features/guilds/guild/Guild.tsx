import {Image, Paper, SimpleGrid, Stack, Title} from '@mantine/core';
import {AnchorBlank} from '../../../components/Text/AnchorBlank';
import {GuildUsers} from './users/GuildUsers';
import {T} from '../../../components/T';
import {useParams} from 'react-router-dom';
import {useTranslatedDocumentTitle} from '../../../hooks/useTranslatedDocumentTitle';
import {Breadcrumb} from '../../../components/Breadcrumb';
import {useGetGuild} from './useGetGuild';
import {useCheckAccess} from '../../../contexts/authentication/useCheckAccess';
import {ApplicationRoles} from '../../../contexts/authentication/authenticationTypes';
import {GuildConfig} from './GuildConfig';
import {JSX, useEffect, useState} from 'react';
import {GuildDetailsDto} from '../guildTypes';
import {NotFound} from '../../error/NotFound';
import {GuildLoading} from './GuildLoading';
import {GuildPageProvider} from '../../../contexts/guild/GuildPageContext';
import {GuildPageParams} from '../GuildRoutes';
import classes from './Guild.module.css';

export function Guild(): JSX.Element {
	useTranslatedDocumentTitle('documentTitle.guild');
	const {guildId} = useParams<GuildPageParams>();
	if (!guildId) throw Error('Invalid state: Guild id required');

	const guildQuery = useGetGuild(guildId);
	const [guild, setGuild] = useState<GuildDetailsDto>();

	useEffect(() => {
		setGuild(guildQuery.data);
	}, [guildId, guildQuery.data]);

	const isAdmin = useCheckAccess(guild ? ApplicationRoles.ROLE_ADMIN : undefined, guildId);
	if (guildQuery.isError) return <NotFound/>;
	if (guildQuery.isLoading || guild?.id !== guildId) return <GuildLoading/>;

	const breadcrumbItems = [
		{
			title: 'breadcrumb.guilds',
			href: '/guilds',
		},
		{
			title: guild.groupIdentifier,
			staticTitle: true,
		},
	];

	return (
		<>
			<Breadcrumb items={breadcrumbItems}/>

			<Paper withBorder p={'lg'} className={classes.guildCard} mb={'md'}>
				<Stack align={'stretch'}>
					<Title order={1} fw={100} ta={'center'}>{guild.groupIdentifier}</Title>
					{guild.emojiUrl &&
                        <Image src={guild.emojiUrl} height={240} fit={'contain'}/>
					}
					<SimpleGrid cols={2}>
						<Stack align={'center'}>
							<Title order={2}><T k={'guild.tag'}/></Title>
							[{guild.groupIdentifier}]
						</Stack>
						<Stack align={'center'}>
							<Title order={2}><T k={'nav.calendar'}/></Title>
							{guild.baseUrl &&
                                <AnchorBlank href={`${guild.baseUrl}/events`}>{guild.baseUrl}</AnchorBlank>
							}
						</Stack>
					</SimpleGrid>
				</Stack>
			</Paper>

			<GuildPageProvider guildId={guildId} isAdmin={isAdmin}>
				{isAdmin &&
                    <GuildConfig/>
				}

				<GuildUsers/>
			</GuildPageProvider>

		</>
	);
}
