import {Avatar, Center, createStyles, Divider, Paper, Spoiler, Stack, Text, Title} from '@mantine/core';
import {UserOwnProfileDto, UserProfileDto} from './profileTypes';
import {useAuth} from '../../contexts/authentication/AuthProvider';
import {ProfileSteamId} from './ProfileSteamId';
import slotbotServerClient from '../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';
import {GlobalNotificationSettings} from './GlobalNotificationSettings';
import {ExternalCalendarSettings} from './ExternalCalendarSettings';
import {useTranslatedDocumentTitle} from '../../hooks/useTranslatedDocumentTitle';
import {T} from '../../components/T';

const useStyles = createStyles((theme) => ({
	userCard: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
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
	useTranslatedDocumentTitle(ownProfile ? 'documentTitle.profile.own' : profileUser.name, undefined, !ownProfile);

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
				<Paper withBorder className={classes.userCard} w={{base: '100%', md: '33%'}} p={'lg'}>
					<Stack align={'center'} spacing={'xs'}>
						<Avatar src={profileUser.avatarUrl} size={'xl'} radius={1000}/>
						<Title order={2} align={'center'}>{profileUser.name}</Title>
						{useAuth().user &&
                            <Spoiler maxHeight={0} classNames={{control: classes.rolesSpoilerControl}}
                                     hideLabel={<T k={'action.hide'}/>}
                                     showLabel={<T k={'profile.action.showRoles'}/>}>
                                <Text color={'dimmed'} align={'center'}>{roles}</Text>
                            </Spoiler>
						}
						{ownProfile && ownProfileInfo &&
                            <ProfileSteamId steamId={ownProfileInfo.steamId64}/>
						}
						<Text mt={'xl'} size={'xl'}>{participatedEventsCount}</Text>
						<Title order={5}><T k={'profile.info.participatedEvents'}/></Title>
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
