import {Avatar, Center, createStyles, Divider, Paper, Spoiler, Stack, Text, Title} from '@mantine/core';
import {UserOwnProfileDto, UserProfileDto} from './profileTypes';
import {useAuth} from '../../contexts/authentication/AuthProvider';
import {ProfileSteamId} from './ProfileSteamId';
import slotbotServerClient from '../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';
import {GlobalNotificationSettings} from './GlobalNotificationSettings';
import {ExternalCalendarSettings} from './ExternalCalendarSettings';

const useStyles = createStyles((theme) => ({
	userCard: {
		width: '33%',
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,

		[theme.fn.smallerThan('md')]: {
			width: '100%',
		},
	},

	rolesSpoilerControl: {
		display: 'flex',
		marginLeft: 'auto',
		marginRight: 'auto',
	},
}));

type ProfileInfoProps = {
	profileInfo: UserProfileDto;
};

export function ProfileInfo(props: ProfileInfoProps): JSX.Element {
	const {user: profileUser, roles, participatedEventsCount, ownProfile} = props.profileInfo;

	let ownProfileInfo;
	if (ownProfile) {
		const getOwnProfileInfo = () => slotbotServerClient.get('/user/own').then((res) => res.data);
		const query = useQuery<UserOwnProfileDto, Error>(['ownProfile'], getOwnProfileInfo);
		ownProfileInfo = query.data;
	}

	const {classes} = useStyles();

	return (
		<Stack>
			<Center>
				<Paper withBorder className={classes.userCard} p={'lg'}>
					<Stack align={'center'} spacing={'xs'}>
						<Avatar src={profileUser.avatarUrl} size={'xl'} radius={1000}/>
						<Title order={2} align={'center'}>{profileUser.name}</Title>
						{useAuth().user &&
                            <Spoiler maxHeight={0} hideLabel={'Ausblenden'} showLabel={'Rollen anzeigen'}
                                     classNames={{control: classes.rolesSpoilerControl}}>
                                <Text color={'dimmed'} align={'center'}>{roles}</Text>
                            </Spoiler>
						}
						{ownProfile && ownProfileInfo &&
                            <ProfileSteamId steamId={ownProfileInfo.steamId64}/>
						}
						<Text mt={'xl'} size={'xl'}>{participatedEventsCount}</Text>
						<Title order={5}>Event-Teilnahmen</Title>
					</Stack>
				</Paper>
			</Center>

			{ownProfile && ownProfileInfo &&
                <>
                    <GlobalNotificationSettings notificationSettings={ownProfileInfo.notificationSettings}/>
                    <Divider/>
                    <ExternalCalendarSettings
                        externalCalendarIntegrationActive={ownProfileInfo.externalCalendarIntegrationActive}
                        icsCalendarUrl={ownProfileInfo.icsCalendarUrl}/>
                </>
			}
		</Stack>
	);
}
