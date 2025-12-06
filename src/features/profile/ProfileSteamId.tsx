import {useField} from '@mantine/form';
import slotbotServerClient from '../../hooks/slotbotServerClient';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {UserOwnProfileDto} from './profileTypes';
import {InlineEditableText} from '../../components/Input/InlineEditable/InlineEditables';
import {errorNotification, successNotification} from '../../utils/notificationHelper';
import {T} from '../../components/T';
import {JSX, useState} from 'react';
import {validate} from '../../utils/formHelper';

type ProfileSteamIdProps = {
	steamId: UserOwnProfileDto['steamId64'];
};

export function ProfileSteamId(props: Readonly<ProfileSteamIdProps>): JSX.Element {
	const steamId = props.steamId ?? '';

	const [savedSteamId, setSavedSteamId] = useState(steamId);
	const field = useField({
		initialValue: steamId,
		validate: (value) => validate(!/^(\d{17})?$/.test(value), <T k={'validation.steamId'}/>),
		validateOnChange: true,
	});

	const queryClient = useQueryClient();
	const postSteamId = () => slotbotServerClient.put(`/user/steamid/${field.getValue()}`, null, {
		transformResponse: (body) => body, // Force string value instead of automatic number conversion
	}).then((res) => res.data);
	const {mutate} = useMutation<string, AxiosError>({
		mutationFn: postSteamId,
		onSuccess: (data) => {
			setSavedSteamId(data);
			successNotification();
			queryClient.setQueryData(['ownProfile'], (oldData: UserOwnProfileDto) => {
				return {
					...oldData,
					steamId64: data === '' ? null : data,
				} satisfies UserOwnProfileDto;
			});
		},
		onError: errorNotification,
	});

	return (
		<InlineEditableText label={<T k={'profile.steamId'}/>} {...field.getInputProps()}
		                    onSubmit={() => mutate()} onCancel={() => field.setValue(savedSteamId)}/>
	);
}
