import {AppShell, Avatar, Button, ScrollArea} from '@mantine/core';
import {useGetGuilds} from './useGetGuilds';
import {DelayedSkeleton} from '../../components/Delayed/DelayedSkeleton';
import {NAV_HEIGHT} from '../../components/nav/Nav';
import {AnchorLink} from '../../components/Text/AnchorLink';
import {SpotlightActionData} from '@mantine/spotlight';
import {useNavigate, useParams} from 'react-router';
import {Dispatch, JSX, SetStateAction, useEffect} from 'react';
import {SearchControl} from './SearchControl';
import {GuildPageParams} from './GuildRoutes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPeopleGroup} from '@fortawesome/free-solid-svg-icons';
import classes from './GuildsNavbar.module.css';

type GuildsNavbarProps = {
	setActions: Dispatch<SetStateAction<SpotlightActionData[]>>;
};

export function GuildsNavbar(props: Readonly<GuildsNavbarProps>): JSX.Element {
	const {guildId} = useParams<GuildPageParams>();
	const guildsQuery = useGetGuilds();
	const navigate = useNavigate();

	useEffect(() => {
		if (!guildsQuery.isSuccess) return;
		const actions = guildsQuery.data.map(guild => {
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
				guildsQuery.data?.map(guild => (
					<Button key={guild.id}
							variant={guildId === guild.id ? 'light' : 'subtle'}
							mt={'xs'} fullWidth justify={'flex-start'}
							className={classes.guildButton}
							leftSection={<Avatar src={guild.emojiUrl} classNames={{image: classes.guildAvatar, placeholder: classes.guildAvatarPlaceholder}}
												 radius={0} size={34}>
								<FontAwesomeIcon icon={faPeopleGroup}/>
							</Avatar>}
							component={AnchorLink}
							to={`/guilds/${guild.id}`}>
						{guild.groupIdentifier}
					</Button>
				))
			}
		</ScrollArea>
	</AppShell.Navbar>;
}
