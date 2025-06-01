import {JSX} from 'react';
import slotbotServerClient, {voidFunction} from '../../../../../hooks/slotbotServerClient';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {showNotification} from '@mantine/notifications';
import {T} from '../../../../../components/T';
import {errorNotification} from '../../../../../utils/notificationHelper';
import {ActionIcon, Tooltip} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserMinus} from '@fortawesome/free-solid-svg-icons';
import {GuildUserActionProps} from './GuildUserActions';

export function RemoveGuildUser(props: Readonly<GuildUserActionProps>): JSX.Element {
    const {user, guildId} = props;

    const queryClient = useQueryClient();
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
