import {JSX} from 'react';
import {useField} from '@mantine/form';
import {maxLengthField} from '../../../../../utils/formValidation';
import {REASON} from '../../../../../utils/maxLength';
import slotbotServerClient, {voidFunction} from '../../../../../hooks/slotbotServerClient';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {showNotification} from '@mantine/notifications';
import {T} from '../../../../../components/T';
import {errorNotification} from '../../../../../utils/notificationHelper';
import {ActionIcon, Button, Group, Stack, Tooltip} from '@mantine/core';
import {TextareaMaxLength} from '../../../../../components/Input/MaxLength/TextareaMaxLength';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGavel} from '@fortawesome/free-solid-svg-icons';
import {GuildUserActionProps} from './GuildUserActions';

export function BanGuildUser(props: Readonly<GuildUserActionProps>): JSX.Element {
	const {user, guildId, queryClient, openModal, closeModal} = props;

	const field = useField({
		initialValue: '',
		validate: maxLengthField(REASON),
	});

	const putGuildUserBan = (reason: string) => slotbotServerClient.put(`/guilds/${guildId}/users/${user.id}/ban`,
		reason, {headers: {'Content-Type': 'text/plain'}}).then(voidFunction);
	const {mutate} = useMutation<void, AxiosError, string>({
		mutationFn: putGuildUserBan,
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['guildUsers', guildId]});
			showNotification({
				title: <T k={'guild.user.banned'}/>,
				message: <></>,
				color: 'green',
			});
		},
		onError: errorNotification,
	});

	return <Tooltip label={<T k={'guild.user.ban'}/>}>
		<ActionIcon color={'red'} variant={'subtle'}
					onClick={() => openModal(
						<T k={'guild.user.ban.title'} args={[user.name]}/>,
						<Stack>
							<T k={'guild.user.ban.description'} html/>
							<TextareaMaxLength label={<T k={'guild.user.ban.reason'}/>} maxLength={REASON} autosize
											   minRows={2}
											   key={field.key} {...field.getInputProps()}/>
							<Group justify={'flex-end'}>
								<Button variant={'default'} onClick={closeModal}><T k={'action.cancel'}/></Button>
								<Button color={'red'} onClick={() => mutate(field.getValue())}>
									<T k={'guild.user.ban.action'}/>
								</Button>
							</Group>
						</Stack>,
					)}>
			<FontAwesomeIcon icon={faGavel}/>
		</ActionIcon>
	</Tooltip>;
}
