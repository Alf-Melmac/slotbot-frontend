import {Avatar, Stack, Text, Title} from '@mantine/core';
import {InlineEditableText} from '../../components/Form/inline/InlineEditableText';
import {UserProfileDto} from './profileTypes';
import {useAuth} from '../../contexts/authentication/AuthProvider';
import {useForm} from '@mantine/form';
import slotbotServerClient from '../../hooks/slotbotServerClient';
import {useMutation} from '@tanstack/react-query';
import {showNotification} from '@mantine/notifications';
import {AxiosError} from 'axios';

type ProfileInfoProps = {
	profileInfo: UserProfileDto;
};

export function ProfileInfo(props: ProfileInfoProps): JSX.Element {
	const {profileInfo} = props;

	const {user} = useAuth();

	const form = useForm({
		initialValues: {
			steamId64: profileInfo.steamId64,
		},
	});

	const postSteamId = () => slotbotServerClient.put(`http://localhost:8090/user/steamid/${form.values.steamId64}`).then(() => { /* void function */ });
	const {mutate} = useMutation<void, AxiosError>(postSteamId, {
		onSuccess: () => {
			showNotification({title: 'Gespeichert', message: <></>, color: 'green'});
		},
		onError: error => {
			showNotification({title: `Speichern fehlgeschlagen. (${error.code})`, message: error.message, color: 'red'});
		}
	});

	return (
		<Stack align={'center'} spacing={'xs'}>
			<Avatar src={profileInfo.user.avatarUrl} size={'xl'} radius={1000}/>
			<Title order={2} align={'center'}>{profileInfo.user.name}</Title>
			{user &&
                <Text color={'dimmed'} align={'center'}>{profileInfo.roles}</Text>
			}
			{profileInfo.ownProfile &&
                <InlineEditableText label={'Steam-ID'} value={profileInfo.steamId64}
									{...form.getInputProps('steamId64')} onSubmit={mutate} onCancel={form.reset}/>
			}
			<Text mt={'xl'} size={'xl'}>{profileInfo.participatedEventsCount}</Text>
			<Title order={5}>Event-Teilnahmen</Title>
		</Stack>
	);
}
