import {ActionIcon, Group} from '@mantine/core';
import {TableCellProps} from './GuildUsers';
import {useGuildPage} from '../../../../contexts/guild/GuildPageContext';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import slotbotServerClient, {voidFunction} from '../../../../hooks/slotbotServerClient';
import {AxiosError} from 'axios';
import {showNotification} from '@mantine/notifications';
import {T} from '../../../../components/T';
import {errorNotification} from '../../../../utils/notificationHelper';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserMinus} from '@fortawesome/free-solid-svg-icons';

export function RemoveGuildUser(props: TableCellProps): JSX.Element {
	const {user} = props.row.original;
	const {guildId} = useGuildPage();

	const queryClient = useQueryClient();
	const deleteGuildUser = () => slotbotServerClient.delete(`/guilds/${guildId}/users/${(user.id)}`).then(voidFunction);
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

	return <Group position={'right'}>
		<ActionIcon color={'red'} onClick={() => mutate()}>
			<FontAwesomeIcon icon={faUserMinus}/>
		</ActionIcon>
	</Group>;
}
