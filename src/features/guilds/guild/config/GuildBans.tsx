import {JSX} from 'react';
import {useGuildPage} from '../../../../contexts/guild/GuildPageContext';
import {ActionIcon, Center, ScrollArea, Skeleton, Table, Tooltip} from '@mantine/core';
import slotbotServerClient from '../../../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';
import {GuildBanDto} from '../../guildTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {GuildUser} from '../users/GuildUser';
import {convertUtcToLocal} from '../../../../utils/dateHelper';
import {faUserCheck} from '@fortawesome/free-solid-svg-icons';
import {T} from '../../../../components/T';

export function GuildBans(): JSX.Element {
	const {guildId} = useGuildPage();

	const getGuildBans = () => slotbotServerClient.get(`/guilds/${guildId}/bans`).then((res) => res.data);
	const {data, isLoading} = useQuery<GuildBanDto[], Error>({
		queryKey: ['guildBans', guildId],
		queryFn: getGuildBans,
	});

	return <ScrollArea h={250}>
		<Table highlightOnHover>
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
					<>{
						[...Array(3)].map((_, i) => (
							<Table.Tr key={i}>
								<Table.Td><Skeleton height={28}/></Table.Td>
								<Table.Td><Skeleton height={28}/></Table.Td>
								<Table.Td><Skeleton height={28}/></Table.Td>
								<Table.Td><Skeleton height={28}/></Table.Td>
							</Table.Tr>
						))
					}</>
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
								<Tooltip label={<T k={'guild.ban.unban'}/>}>
									<ActionIcon variant={'default'}>
										<FontAwesomeIcon icon={faUserCheck}/>
									</ActionIcon>
								</Tooltip>
							</Table.Td>
						</Table.Tr>
					))
				}
			</Table.Tbody>
		</Table>
		{data?.length === 0 && <Center mt={'sm'}><T k={'guild.bans.none'}/></Center>}
	</ScrollArea>;
}
