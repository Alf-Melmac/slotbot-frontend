import {useForm} from '@mantine/form';
import slotbotServerClient, {voidFunction} from '../../hooks/slotbotServerClient';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {UserOwnProfileDto} from './profileTypes';
import {InlineEditableText} from '../../components/Input/InlineEditable/InlineEditables';
import {errorNotification, successNotification} from '../../utils/notificationHelper';
import {T} from '../../components/T';

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
		onSuccess: () => successNotification(),
		onError: errorNotification,
	});

	return (
		<InlineEditableText label={<T k={'profile.steamId'}/>} value={steamId}
							{...form.getInputProps('steamId')} onSubmit={mutate} onCancel={form.reset}/>
	);
}
