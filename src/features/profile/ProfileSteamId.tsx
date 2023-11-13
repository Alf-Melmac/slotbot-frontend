import {useForm} from '@mantine/form';
import slotbotServerClient, {voidFunction} from '../../hooks/slotbotServerClient';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {UserOwnProfileDto} from './profileTypes';
import {InlineEditableText} from '../../components/Input/InlineEditable/InlineEditables';
import {errorNotification, successNotification} from '../../utils/notificationHelper';
import {T} from '../../components/T';
import {useState} from 'react';

type ProfileSteamIdProps = {
	steamId: UserOwnProfileDto['steamId64'];
};

export function ProfileSteamId(props: ProfileSteamIdProps): JSX.Element {
	const {steamId} = props;

	const [savedSteamId, setSavedSteamId] = useState(steamId);
	const form = useForm({
		initialValues: {
			steamId: steamId,
		},
	});

	const postSteamId = () => slotbotServerClient.put(`/user/steamid/${form.values.steamId}`).then(voidFunction);
	const {mutate} = useMutation<void, AxiosError>({
		mutationFn: postSteamId,
		onSuccess: () => {
			setSavedSteamId(form.values.steamId);
			successNotification();
		},
		onError: errorNotification,
	});

	return (
		<InlineEditableText label={<T k={'profile.steamId'}/>}{...form.getInputProps('steamId')}
							onSubmit={() => mutate()} onCancel={() => form.setFieldValue('steamId', savedSteamId)}/>
	);
}
