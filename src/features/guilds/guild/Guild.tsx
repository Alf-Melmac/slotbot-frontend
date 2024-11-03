import {Button, Group, Image, Stack, Title} from '@mantine/core';
import {GuildUsers} from './users/GuildUsers';
import {T} from '../../../components/T';
import {Link, useParams, useResolvedPath} from 'react-router-dom';
import {useDynamicDocumentTitle} from '../../../hooks/useDocumentTitle';
import {Breadcrumb} from '../../../components/Breadcrumb';
import {useGetGuild} from './useGetGuild';
import {useCheckAccess} from '../../../contexts/authentication/useCheckAccess';
import {ApplicationRoles} from '../../../contexts/authentication/authenticationTypes';
import {JSX, useEffect} from 'react';
import {NotFoundPage} from '../../error/ErrorRoutes';
import {GuildLoading} from './GuildLoading';
import {GuildPageProvider} from '../../../contexts/guild/GuildPageContext';
import {GuildPageParams} from '../GuildRoutes';
import classes from './Guild.module.css';
import {AnchorLink} from '../../../components/Text/AnchorLink';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowUpRightFromSquare, faGear} from '@fortawesome/free-solid-svg-icons';

export function Guild(): JSX.Element {
	const setTitle = useDynamicDocumentTitle('documentTitle.guild');
	const {guildId} = useParams<GuildPageParams>();
	if (!guildId) throw Error('Invalid state: Guild id required');

	const {data: guild, isLoading, isError} = useGetGuild(guildId);
	useEffect(() => {
		if (guild) {
			setTitle(guild.groupIdentifier);
		}
	}, [guild?.groupIdentifier]);

	const guildCalendarPath = useResolvedPath(`/events/calendar/${guild?.groupIdentifier}`).pathname;

	const isAdmin = useCheckAccess(guild ? ApplicationRoles.ROLE_ADMIN : undefined, guildId);
	if (isError) return <NotFoundPage/>;
	if (isLoading || guild?.id !== guildId) return <GuildLoading/>;

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

	const guildUrl = guild.baseUrl ? guild.baseUrl : `${window.location.origin}${guildCalendarPath}`;

	return (
		<>
			<Breadcrumb items={breadcrumbItems}/>

			<Group justify={'space-between'} align={'center'} mb={'md'}>
				<Stack gap={'xs'}>
					<Group align={'flex-start'}>
						{guild.emojiUrl &&
                            <Image src={guild.emojiUrl} fit={'contain'} className={classes.image}/>
						}
						<Title order={1} fw={100}>{guild.groupIdentifier}</Title>
					</Group>
					<AnchorLink to={guildUrl} size={'sm'}>
						{guildUrl.replace('https://', '')}
					</AnchorLink>
				</Stack>
				<Group>
					{isAdmin &&
                        <Button variant={'default'} leftSection={<FontAwesomeIcon icon={faGear}/>}
                                component={Link} to={`/guilds/${guildId}/edit`}>
                            <T k={'guild.manage'}/>
                        </Button>
					}
					<Button leftSection={<FontAwesomeIcon icon={faArrowUpRightFromSquare}/>}
							component={Link} to={guildCalendarPath}>
						<T k={'nav.calendar'}/>
					</Button>
				</Group>
			</Group>

			<Title order={2} mt={'lg'}><T k={'members'}/></Title>
			<GuildPageProvider guildId={guildId} isAdmin={isAdmin}>
				<GuildUsers/>
			</GuildPageProvider>
		</>
	);
}
