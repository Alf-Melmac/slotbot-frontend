import {JSX} from 'react';
import {useField} from '@mantine/form';
import {maxLengthField} from '../../../../../utils/formValidation';
import {REASON} from '../../../../../utils/maxLength';
import slotbotServerClient, {voidFunction} from '../../../../../hooks/slotbotServerClient';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {showNotification} from '@mantine/notifications';
import {T} from '../../../../../components/T';
import {errorNotification} from '../../../../../utils/notificationHelper';
import {ActionIcon, Button, Group, Modal, Stack, Tooltip} from '@mantine/core';
import {TextareaMaxLength} from '../../../../../components/Input/MaxLength/TextareaMaxLength';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGavel} from '@fortawesome/free-solid-svg-icons';
import {GuildUserActionProps} from './GuildUserActions';
import {useDisclosure} from '@mantine/hooks';

export function BanGuildUser(props: Readonly<GuildUserActionProps>): JSX.Element {
	const {user, guildId} = props;
	const [opened, {open, close}] = useDisclosure(false);

	const field = useField({
		initialValue: '',
		validate: maxLengthField(REASON),
	});

	const queryClient = useQueryClient();
	const putGuildUserBan = (reason: string) => slotbotServerClient.put(`/guilds/${guildId}/users/${user.id}/ban`,
		reason, {headers: {'Content-Type': 'text/plain'}}).then(voidFunction);
	const {mutate} = useMutation<void, AxiosError, string>({
		mutationFn: putGuildUserBan,
		onSuccess: () => {
			// noinspection JSIgnoredPromiseFromCall
			queryClient.invalidateQueries({queryKey: ['guildUsers', guildId]});
			showNotification({
				title: <T k={'guild.user.banned'}/>,
				message: <></>,
				color: 'green',
			});
		},
		onError: errorNotification,
	});

	return <>
		<Modal opened={opened} onClose={close} title={<T k={'guild.user.ban.title'} args={[user.name]}/>}>
			<Stack>
				<T k={'guild.user.ban.description'} html/>
				<TextareaMaxLength label={<T k={'guild.user.ban.reason'}/>} maxLength={REASON} autosize
								   minRows={2}
								   key={field.key} {...field.getInputProps()}/>
				<Group justify={'flex-end'}>
					<Button variant={'default'} onClick={close}><T k={'action.cancel'}/></Button>
					<Button color={'red'} onClick={() => mutate(field.getValue())}>
						<T k={'guild.user.ban.action'}/>
					</Button>
				</Group>
			</Stack>
		</Modal>
		<Tooltip label={<T k={'guild.user.ban'}/>}>
			<ActionIcon color={'red'} variant={'subtle'}
						onClick={open}>
				<FontAwesomeIcon icon={faGavel}/>
			</ActionIcon>
		</Tooltip>
	</>;
}
