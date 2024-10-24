import {ActionIcon, Button, Group, Modal, Stack, Tooltip} from '@mantine/core';
import {TableCellProps} from './GuildUsers';
import {useGuildPage} from '../../../../contexts/guild/GuildPageContext';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import slotbotServerClient, {voidFunction} from '../../../../hooks/slotbotServerClient';
import {AxiosError} from 'axios';
import {showNotification} from '@mantine/notifications';
import {T} from '../../../../components/T';
import {errorNotification} from '../../../../utils/notificationHelper';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGavel, faUserMinus} from '@fortawesome/free-solid-svg-icons';
import {JSX} from 'react';
import {useDisclosure} from '@mantine/hooks';
import {TextareaMaxLength} from '../../../../components/Input/MaxLength/TextareaMaxLength';
import {REASON} from '../../../../utils/maxLength';
import {useField} from '@mantine/form';
import {maxLengthField} from '../../../../utils/formValidation';

export function GuildUserActions(props: Readonly<TableCellProps>): JSX.Element {
	const {user} = props.row.original;
	const {guildId} = useGuildPage();
	const queryClient = useQueryClient();

	return <Group justify={'right'}>
		<RemoveGuildUser user={user} guildId={guildId} queryClient={queryClient}/>
		<BanGuildUser user={user} guildId={guildId} queryClient={queryClient}/>
	</Group>;
}

type GuildUserActionProps =
	Pick<TableCellProps['row']['original'], 'user'>
	& Pick<ReturnType<typeof useGuildPage>, 'guildId'>
	& { queryClient: ReturnType<typeof useQueryClient> };

function RemoveGuildUser(props: Readonly<GuildUserActionProps>): JSX.Element {
	const {user, guildId, queryClient} = props;

	const deleteGuildUser = () => slotbotServerClient.delete(`/guilds/${guildId}/users/${user.id}`).then(voidFunction);
	const {mutate} = useMutation<void, AxiosError>({
		mutationFn: deleteGuildUser,
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['guildUsers', guildId]});
			showNotification({
				title: <T k={'guild.user.removed'}/>,
				message: <></>,
				color: 'green',
			});
		},
		onError: errorNotification,
	});

	return <Tooltip label={<T k={'guild.user.remove'}/>}>
		<ActionIcon color={'red'} variant={'subtle'} onClick={() => mutate()}>
			<FontAwesomeIcon icon={faUserMinus}/>
		</ActionIcon>
	</Tooltip>;
}


function BanGuildUser(props: Readonly<GuildUserActionProps>): JSX.Element {
	const {user, guildId, queryClient} = props;

	const [opened, {open, close}] = useDisclosure(false);
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

	return <>
		<Modal opened={opened} onClose={close} title={<T k={'guild.user.ban.title'} args={[user.name]}/>}>
			<Stack>
				<T k={'guild.user.ban.description'} html/>
				<TextareaMaxLength label={<T k={'guild.user.ban.reason'}/>} maxLength={REASON} autosize minRows={2}
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
			<ActionIcon color={'red'} variant={'subtle'} onClick={open}>
				<FontAwesomeIcon icon={faGavel}/>
			</ActionIcon>
		</Tooltip>
	</>;
}
