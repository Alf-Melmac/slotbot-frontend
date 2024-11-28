import {JSX} from 'react';
import {useGuildPage} from '../../../../contexts/guild/GuildPageContext';
import {ActionIcon, Center, ScrollArea, Table, Tooltip} from '@mantine/core';
import slotbotServerClient, {voidFunction} from '../../../../hooks/slotbotServerClient';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {GuildBanDto} from '../../guildTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {GuildUser} from '../users/GuildUser';
import {convertUtcToLocal} from '../../../../utils/dateHelper';
import {faUserCheck} from '@fortawesome/free-solid-svg-icons';
import {T} from '../../../../components/T';
import {showNotification} from '@mantine/notifications';
import {errorNotification} from '../../../../utils/notificationHelper';
import {AxiosError} from 'axios';
import {LoadingRows} from '../../../../components/Table/LoadingRows';

export function GuildBans(): JSX.Element {
	const {guildId} = useGuildPage();

	const getGuildBans = () => slotbotServerClient.get(`/guilds/${guildId}/bans`).then((res) => res.data);
	const {data, isLoading} = useQuery<GuildBanDto[], Error>({
		queryKey: ['guildBans', guildId],
		queryFn: getGuildBans,
	});

	return <ScrollArea h={250}>
		<Table highlightOnHover stickyHeader>
			<Table.Thead>
				<Table.Tr>
					<Table.Th><T k={'user.name'}/></Table.Th>
					<Table.Th><T k={'guild.ban.reason'}/></Table.Th>
					<Table.Th><T k={'guild.ban.timestamp'}/></Table.Th>
					<Table.Th></Table.Th>
				</Table.Tr>
			</Table.Thead>
			<Table.Tbody>
				{isLoading ?
					<LoadingRows columns={4}/>
					:
					data?.map((ban) => (
						<Table.Tr key={ban.user.id}>
							<Table.Td>
								<GuildUser {...ban.user}/>
							</Table.Td>
							<Table.Td>
								{ban.reason}
							</Table.Td>
							<Table.Td>
								{convertUtcToLocal(ban.bannedAt).format('L LT')}
							</Table.Td>
							<Table.Td>
								<UnbanUser ban={ban} guildId={guildId}/>
							</Table.Td>
						</Table.Tr>
					))
				}
			</Table.Tbody>
		</Table>
		{data?.length === 0 && <Center mt={'sm'}><T k={'guild.bans.none'}/></Center>}
	</ScrollArea>;
}

type UnbanUserProps = {
	ban: GuildBanDto;
} & Pick<ReturnType<typeof useGuildPage>, 'guildId'>;

function UnbanUser(props: Readonly<UnbanUserProps>): JSX.Element {
	const {ban: {user}, guildId} = props;

	const queryClient = useQueryClient();
	const deleteGuildBan = () => slotbotServerClient.delete(`/guilds/${guildId}/users/${user.id}/ban`).then(voidFunction);
	const {mutate} = useMutation<void, AxiosError>({
		mutationFn: deleteGuildBan,
		onSuccess: () => {
			queryClient.setQueryData(['guildBans', guildId], (data: GuildBanDto[]) => data.filter((ban) => ban.user.id !== user.id));
			showNotification({
				title: <T k={'guild.ban.unbanned'}/>,
				message: <></>,
				color: 'green',
			});
		},
		onError: errorNotification,
	});

	return <Tooltip label={<T k={'guild.ban.unban'}/>}>
		<ActionIcon variant={'default'} onClick={() => mutate()}>
			<FontAwesomeIcon icon={faUserCheck}/>
		</ActionIcon>
	</Tooltip>;
}
