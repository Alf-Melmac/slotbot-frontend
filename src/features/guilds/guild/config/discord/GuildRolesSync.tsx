import {JSX} from 'react';
import {useGuildPage} from '../../../../../contexts/guild/GuildPageContext';
import {ActionIcon, Button, Group, Popover} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRotate, faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';
import {T} from '../../../../../components/T';
import {ElementWithInfo} from '../../../../../components/Text/ElementWithInfo';
import slotbotServerClient, {voidFunction} from '../../../../../hooks/slotbotServerClient';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {errorNotification, successNotification} from '../../../../../utils/notificationHelper';

type GuildRolesSyncProps = {
	hasAdminRole: boolean;
};

export function GuildRolesSync({hasAdminRole}: Readonly<GuildRolesSyncProps>): JSX.Element {
	const {guildId} = useGuildPage();

	const queryClient = useQueryClient();
	const putDiscordSync = () => slotbotServerClient.put(`/guilds/${guildId}/discord/sync`).then(voidFunction);
	const {mutate, isPending} = useMutation<void, AxiosError>({
		mutationFn: putDiscordSync,
		onSuccess: () => {
			successNotification(<T k={'guild.config.roles.sync.submitted'}/>);
			// noinspection JSIgnoredPromiseFromCall
			queryClient.invalidateQueries({queryKey: ['guildUsers', guildId]});
		},
		onError: errorNotification,
	});

	return <Group gap={'sm'}>
		{!hasAdminRole &&
			<Popover width={500}>
				<Popover.Target>
					<ActionIcon color={'yellow'} variant={'light'}>
						<FontAwesomeIcon icon={faTriangleExclamation}/>
					</ActionIcon>
				</Popover.Target>
				<Popover.Dropdown>
					<T k={'guild.config.roles.sync.noAdminRole'} html/>
				</Popover.Dropdown>
			</Popover>
		}
		<ElementWithInfo
			text={<Button
				leftSection={<FontAwesomeIcon icon={faRotate}/>}
				variant={'light'}
				onClick={() => mutate()}
				loading={isPending}>
				<T k={'guild.config.roles.sync'}/>
			</Button>}
			tooltip={<T k={'guild.config.roles.sync.description'}/>}/>
	</Group>;
}
