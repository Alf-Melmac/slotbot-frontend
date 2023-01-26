import {useGetGuild} from './useGetGuilds';
import {createStyles, Image, Paper, SimpleGrid, Stack, Title} from '@mantine/core';
import {AnchorBlank} from '../../components/Text/AnchorBlank';
import {GuildUsers} from './GuildUsers';
import {T} from '../../components/T';
import {useParams} from 'react-router-dom';
import {useTranslatedDocumentTitle} from '../../hooks/useTranslatedDocumentTitle';
import {Breadcrumb} from '../../components/Breadcrumb';

const useStyles = createStyles((theme) => ({
	guildCard: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
	},
}));

export type GuildProps = {
	guildId: string;
};

export function Guild(): JSX.Element {
	useTranslatedDocumentTitle('documentTitle.guild');
	const {guildId} = useParams<GuildProps>();
	if (!guildId) throw Error('Invalid state: Guild id required');

	const {classes} = useStyles();

	const guildQuery = useGetGuild(guildId);
	const guild = guildQuery.data;
	if (guildQuery.isLoading || !guild) return <></>;

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
					<Title order={1} weight={100} align={'center'}>{guild.groupIdentifier}</Title>
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

			<GuildUsers guildId={guildId}/>
		</>
	);
}
