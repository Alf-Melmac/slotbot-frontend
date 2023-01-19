import {Button, createStyles, Image, Navbar, ScrollArea, TextInput} from '@mantine/core';
import {useGetGuilds} from './useGetGuilds';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass, faPeopleGroup} from '@fortawesome/free-solid-svg-icons';
import {DelayedSkeleton} from '../../components/DelayedSkeleton';
import {NAV_HEIGHT} from '../../components/nav/Nav';
import {useLanguage} from '../../contexts/language/Language';
import {SEARCH_KEYS_WIDTH, SearchKeys} from '../../components/Input/SearchKeys';
import {AnchorLink} from '../../components/Text/AnchorLink';

const useStyles = createStyles((theme) => ({
	guildButton: {
		justifyContent: 'start',
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.dark[9],
	},

	search: {
		pointerEvents: 'none',
	},
}));

type GuildsNavbarProps = {
	guildId: string | undefined;
}

export function GuildsNavbar(props: GuildsNavbarProps): JSX.Element {
	const {classes} = useStyles();
	const guildsQuery = useGetGuilds();

	return <Navbar width={{xs: 200, sm: 300}} p={'sm'} pt={NAV_HEIGHT / 3.33}>
		<Navbar.Section>
			<GuildNavbarSearch/>
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

function GuildNavbarSearch(): JSX.Element {
	const {classes} = useStyles();
	const {t} = useLanguage();

	return <TextInput
		placeholder={t('search')}
		classNames={{rightSection: classes.search}}
		icon={<FontAwesomeIcon icon={faMagnifyingGlass}/>}
		rightSection={<SearchKeys/>}
		rightSectionWidth={SEARCH_KEYS_WIDTH}
		disabled //TODO
	/>;
}
