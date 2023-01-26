import {Button, createStyles, Image, Navbar, ScrollArea} from '@mantine/core';
import {useGetGuilds} from './useGetGuilds';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPeopleGroup} from '@fortawesome/free-solid-svg-icons';
import {DelayedSkeleton} from '../../components/DelayedSkeleton';
import {NAV_HEIGHT} from '../../components/nav/Nav';
import {AnchorLink} from '../../components/Text/AnchorLink';
import {registerSpotlightActions, removeSpotlightActions, SpotlightAction} from '@mantine/spotlight';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {SearchControl} from './SearchControl';
import {SPOTLIGHT_LOADING} from './GuildsPage';

const useStyles = createStyles((theme) => ({
	guildButton: {
		justifyContent: 'start',
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.dark[9],
	},
}));

type GuildsNavbarProps = {
	guildId: string | undefined;
}

export function GuildsNavbar(props: GuildsNavbarProps): JSX.Element {
	const {classes} = useStyles();
	const guildsQuery = useGetGuilds();
	const navigate = useNavigate();

	useEffect(() => {
		if (!guildsQuery.isSuccess) return;
		const actions: SpotlightAction[] = guildsQuery.data.map(guild => ({
			id: guild.id,
			title: guild.groupIdentifier,
			onTrigger: () => navigate(`/guilds/${guild.id}`),
		})) || [];

		removeSpotlightActions([SPOTLIGHT_LOADING]);
		registerSpotlightActions(actions);
	}, [guildsQuery.data]);

	return <Navbar width={{xs: 200, sm: 300}} p={'sm'} pt={NAV_HEIGHT / 3.33}>
		<Navbar.Section>
			<SearchControl/>
		</Navbar.Section>
		<Navbar.Section grow component={ScrollArea}>
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
							variant={props.guildId === guild.id ? 'light' : 'subtle'}
							mt={'xs'} fullWidth
							classNames={{inner: classes.guildButton}}
							leftIcon={
								<Image src={guild.emojiUrl} width={34} withPlaceholder
									   placeholder={<FontAwesomeIcon icon={faPeopleGroup}/>}/>
							}
							component={AnchorLink}
							to={`/guilds/${guild.id}`}>
						{guild.groupIdentifier}
					</Button>
				))
			}
		</Navbar.Section>
	</Navbar>;
}
