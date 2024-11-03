import {Avatar, Center, Divider, Group, Paper, Spoiler, Stack, Text, Title} from '@mantine/core';
import {UserOwnProfileDto, UserProfileDto} from './profileTypes';
import {useAuth} from '../../contexts/authentication/AuthProvider';
import {ProfileSteamId} from './ProfileSteamId';
import slotbotServerClient from '../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';
import {GlobalNotificationSettings} from './GlobalNotificationSettings';
import {ExternalCalendarSettings} from './ExternalCalendarSettings';
import {useTranslatedDocumentTitle} from '../../hooks/useDocumentTitle';
import {T} from '../../components/T';
import {JSX} from 'react';
import classes from './ProfileInfo.module.css';
import {AnchorLink} from '../../components/Text/AnchorLink';

type ProfileInfoProps = {
	profileInfo: UserProfileDto;
};

export function ProfileInfo(props: Readonly<ProfileInfoProps>): JSX.Element {
	const {user: profileUser, roles, participatedEventsCount, lastEvent, ownProfile} = props.profileInfo;
	useTranslatedDocumentTitle(ownProfile ? 'documentTitle.profile.own' : profileUser.name, undefined, !ownProfile);

	let ownProfileInfo;
	if (ownProfile) {
		const getOwnProfileInfo = () => slotbotServerClient.get('/user/own').then((res) => res.data);
		const query = useQuery<UserOwnProfileDto, Error>({
			queryKey: ['ownProfile'],
			queryFn: getOwnProfileInfo,
		});
		ownProfileInfo = query.data;
	}

	return (
		<Stack>
			<Center>
				<Paper withBorder className={classes.userCard} w={{base: '100%', md: '33%'}} p={'lg'}>
					<Stack align={'center'} gap={'xs'}>
						<Avatar src={profileUser.avatarUrl} size={'xl'} radius={1000}/>
						<Title order={2} ta={'center'}>{profileUser.name}</Title>
						{useAuth().user &&
                            <Spoiler maxHeight={0} classNames={{control: classes.rolesSpoilerControl}}
                                     hideLabel={<T k={'action.hide'}/>}
                                     showLabel={<T k={'profile.action.showRoles'}/>}>
                                <Text c={'dimmed'} ta={'center'}>{roles}</Text>
                            </Spoiler>
						}
						{ownProfile && ownProfileInfo &&
                            <ProfileSteamId steamId={ownProfileInfo.steamId64}/>
						}
						<Group mt={'xl'} justify={'center'}>
							<Stack align={'center'} gap={'xs'}>
								<Title order={5}><T k={'profile.info.participatedEvents'}/></Title>
								<Text size={'xl'}>{participatedEventsCount}</Text>
							</Stack>
							<Stack align={'center'} gap={'xs'}>
								<Title order={5}><T k={'profile.info.lastEvent'}/></Title>
								{
									lastEvent ?
										<AnchorLink to={`/events/${lastEvent.id}`} size={'xl'}>
											<T k={'time.diff.past.day'} count={lastEvent.daysSince} countAsArgs/>
										</AnchorLink>
										:
										<Text size={'xl'}>–</Text>
								}
							</Stack>
						</Group>
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
