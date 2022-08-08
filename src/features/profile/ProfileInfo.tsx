import {Avatar, Center, createStyles, Paper, Stack, Text, Title} from '@mantine/core';
import {UserProfileDto} from './profileTypes';
import {isAuthenticated} from '../../contexts/authentication/AuthProvider';
import {ProfileSteamId} from './ProfileSteamId';
import {TextWithInfo} from '../../components/Text/TextWithInfo';

const useStyles = createStyles((theme) => ({
	userCard: {
		width: '33%',
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,

		[theme.fn.smallerThan('md')]: {
			width: '100%',
		},
	},
}));

type ProfileInfoProps = {
	profileInfo: UserProfileDto;
};

export function ProfileInfo(props: ProfileInfoProps): JSX.Element {
	const {user: profileUser, roles, participatedEventsCount, ownProfile, steamId64} = props.profileInfo;

	const {classes} = useStyles();

	return (
		<Stack>
			<Center>
				<Paper withBorder className={classes.userCard} p={'lg'}>
					<Stack align={'center'} spacing={'xs'}>
						<Avatar src={profileUser.avatarUrl} size={'xl'} radius={1000}/>
						<Title order={2} align={'center'}>{profileUser.name}</Title>
						{isAuthenticated() &&
                            <Text color={'dimmed'} align={'center'}>{roles}</Text>
						}
						{ownProfile &&
                            <ProfileSteamId steamId={steamId64}/>
						}
						<Text mt={'xl'} size={'xl'}>{participatedEventsCount}</Text>
						<Title order={5}>Event-Teilnahmen</Title>
					</Stack>
				</Paper>
			</Center>

			{ownProfile &&
                <Title order={3}>
                    <TextWithInfo text={'Globale Benachrichtigungseinstellungen'}
                                  tooltip={'Hier können die Benachrichtigungen vor einem Event konfiguriert werden. Benachrichtigungen erhältst du in Form einer Discord Privatnachricht.'}
					multiline width={300} position={'right'}/>
                </Title>
			}
		</Stack>
	);
}
