import {AppShell, Avatar, Button, Image, ScrollArea} from '@mantine/core';
import {useGetGuilds} from './useGetGuilds';
import {DelayedSkeleton} from '../../components/Delayed/DelayedSkeleton';
import {NAV_HEIGHT} from '../../components/nav/Nav';
import {AnchorLink} from '../../components/Text/AnchorLink';
import {SpotlightActionData} from '@mantine/spotlight';
import {useNavigate, useParams} from 'react-router-dom';
import {Dispatch, JSX, SetStateAction, useEffect} from 'react';
import {SearchControl} from './SearchControl';
import {GuildPageParams} from './GuildRoutes';
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
		const actions: SpotlightActionData[] = guildsQuery.data.map(guild => ({
			id: guild.id,
			title: guild.groupIdentifier,
			leftSection: <Avatar src={guild.emojiUrl}>{guild.groupIdentifier}</Avatar>,
			onClick: () => navigate(`/guilds/${guild.id}`),
		}) satisfies SpotlightActionData) || [];

		props.setActions(actions);
	}, [guildsQuery.data]);

	return <AppShell.Navbar p={'sm'} pt={NAV_HEIGHT / 3.33}>
		<SearchControl/>
		<ScrollArea>{/*grow*/}
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
					        mt={'xs'} fullWidth
					        classNames={{inner: classes.guildButton}}
					        leftSection={
						        <Image src={guild.emojiUrl} width={34} /*withPlaceholder
						               placeholder={<FontAwesomeIcon icon={faPeopleGroup}/>} TODO m7-8*//>
					        }
					        component={AnchorLink}
					        to={`/guilds/${guild.id}`}>
						{guild.groupIdentifier}
					</Button>
				))
			}
		</ScrollArea>
	</AppShell.Navbar>;
}
