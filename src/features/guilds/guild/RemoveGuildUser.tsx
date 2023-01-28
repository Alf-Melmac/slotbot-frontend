import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserMinus} from '@fortawesome/free-solid-svg-icons';
import {ActionIcon} from '@mantine/core';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import slotbotServerClient, {voidFunction} from '../../../hooks/slotbotServerClient';
import {AxiosError} from 'axios';
import {errorNotification} from '../../../utils/notificationHelper';
import {showNotification} from '@mantine/notifications';
import {T} from '../../../components/T';

type RemoveGuildUserProps = {
    guildId: string;
    userId: string;
};

export function RemoveGuildUser(props: RemoveGuildUserProps): JSX.Element {
    const {guildId, userId} = props;

    const queryClient = useQueryClient();
    const deleteGuildUser = () => slotbotServerClient.delete(`/guilds/${guildId}/users/${userId}`).then(voidFunction);
    const {mutate} = useMutation<void, AxiosError>(deleteGuildUser, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['guildUsers', guildId]});
            showNotification({
                title: <T k={'guild.user.removed'}/>,
                message: <></>,
                color: 'green',
            });
        },
        onError: errorNotification,
    })

    return (
        <ActionIcon color={'red'} onClick={() => mutate()}>
            <FontAwesomeIcon icon={faUserMinus}/>
        </ActionIcon>
    );
}
