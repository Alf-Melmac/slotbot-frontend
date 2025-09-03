import {Accordion, Alert, AppShell, Avatar, Button, ScrollArea} from '@mantine/core';
import {useGetGuildsCategorised} from './useGetGuilds';
import {DelayedSkeleton} from '../../components/Delayed/DelayedSkeleton';
import {NAV_HEIGHT} from '../../components/nav/Nav';
import {AnchorLink} from '../../components/Text/AnchorLink';
import {SpotlightActionData} from '@mantine/spotlight';
import {useNavigate, useParams} from 'react-router';
import {Dispatch, JSX, SetStateAction, useEffect} from 'react';
import {SearchControl} from './SearchControl';
import {GuildPageParams} from './GuildRoutes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInfo, faPeopleGroup} from '@fortawesome/free-solid-svg-icons';
import classes from './GuildsNavbar.module.css';
import {GuildDto} from './guildTypes';
import {T} from '../../components/T';

type GuildsNavbarProps = {
	setActions: Dispatch<SetStateAction<SpotlightActionData[]>>;
};

export function GuildsNavbar(props: Readonly<GuildsNavbarProps>): JSX.Element {
	const {guildId} = useParams<GuildPageParams>();
	const guildsQuery = useGetGuildsCategorised();
	const navigate = useNavigate();

	useEffect(() => {
		if (!guildsQuery.isSuccess) return;
		const actions = [...guildsQuery.data.active, ...guildsQuery.data.inactive].map(guild => {
			return {
				id: guild.id,
				label: guild.groupIdentifier,
				leftSection: <Avatar src={guild.emojiUrl}/>,
				onClick: () => navigate(`/guilds/${guild.id}`),
			} satisfies SpotlightActionData;
		});

		props.setActions(actions);
	}, [guildsQuery.data]);

	return <AppShell.Navbar p={'sm'} pt={NAV_HEIGHT / 3.33}>
		<SearchControl/>
		<ScrollArea>
			{guildsQuery.isLoading ?
				<>
					<DelayedSkeleton width={'100%'} height={34} mt={'xs'}/>
					<DelayedSkeleton width={'100%'} height={34} mt={'xs'}/>
					<DelayedSkeleton width={'100%'} height={34} mt={'xs'}/>
					<DelayedSkeleton width={'100%'} height={34} mt={'xs'}/>
					<DelayedSkeleton width={'100%'} height={34} mt={'xs'}/>
				</>
				:
				<>
					{guildsQuery.data?.active.map(guild =>
						<GuildButton key={guild.id} guild={guild} selectedGuildId={guildId}/>)}
					{!!guildsQuery.data?.inactive.length &&
					<Accordion mt={'xs'}>
						<Accordion.Item value="inactive">
							<Accordion.Control><T k={'guilds.inactive'}/></Accordion.Control>
							<Accordion.Panel>
								<Alert variant={'outline'} icon={<FontAwesomeIcon icon={faInfo}/>} color={'blue'}>
                                    <T k={'guilds.inactive.description'}/>
								</Alert>
								{guildsQuery.data.inactive.map(guild =>
									<GuildButton key={guild.id} guild={guild} selectedGuildId={guildId}/>)}
							</Accordion.Panel>
						</Accordion.Item>
					</Accordion>
					}
				</>
			}
		</ScrollArea>
	</AppShell.Navbar>;
}

type GuildButtonProps = {
	guild: GuildDto;
	selectedGuildId?: GuildPageParams['guildId'];
}

function GuildButton({guild, selectedGuildId}: Readonly<GuildButtonProps>): JSX.Element {
	return <Button key={guild.id}
				   variant={selectedGuildId === guild.id ? 'light' : 'subtle'}
				   mt={'xs'} fullWidth justify={'flex-start'}
				   className={classes.guildButton}
				   leftSection={<Avatar src={guild.emojiUrl} classNames={{
					   image: classes.guildAvatar,
					   placeholder: classes.guildAvatarPlaceholder,
				   }}
										radius={0} size={34}>
					   <FontAwesomeIcon icon={faPeopleGroup}/>
				   </Avatar>}
				   component={AnchorLink}
				   to={`/guilds/${guild.id}`}>
		{guild.groupIdentifier}
	</Button>;
}
