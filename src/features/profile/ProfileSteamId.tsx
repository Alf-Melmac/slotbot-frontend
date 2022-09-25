import {InlineEditableText} from '../../components/Input/InlineEditable/InlineEditableText';
import {useForm} from '@mantine/form';
import slotbotServerClient, {voidFunction} from '../../hooks/slotbotServerClient';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {showNotification} from '@mantine/notifications';
import {UserOwnProfileDto} from './profileTypes';

type ProfileSteamIdProps = {
	steamId: UserOwnProfileDto['steamId64'];
};

export function ProfileSteamId(props: ProfileSteamIdProps): JSX.Element {
	const {steamId} = props;

	const form = useForm({
		initialValues: {
			steamId: steamId,
		},
	});

	const postSteamId = () => slotbotServerClient.put(`/user/steamid/${form.values.steamId}`).then(voidFunction);
	const {mutate} = useMutation<void, AxiosError>(postSteamId, {
		onSuccess: () => {
			showNotification({title: 'Gespeichert', message: <></>, color: 'green'});
		},
		onError: error => {
			showNotification({
				title: `Speichern fehlgeschlagen. (${error.code})`,
				message: error.message,
				color: 'red',
			});
		},
	});

	return (
		<InlineEditableText label={'Steam-ID'} value={steamId}
							{...form.getInputProps('steamId')} onSubmit={mutate} onCancel={form.reset}/>
	);
}
