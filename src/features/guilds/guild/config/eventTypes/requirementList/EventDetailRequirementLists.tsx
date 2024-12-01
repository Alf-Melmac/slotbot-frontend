import {JSX} from 'react';
import {EventTypeDto} from '../../../../../event/eventTypes';
import slotbotServerClient, {voidFunction} from '../../../../../../hooks/slotbotServerClient';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {EventTypeRequirementListDto} from '../../requirement/requirementTypes';
import {useGuildPage} from '../../../../../../contexts/guild/GuildPageContext';
import {Checkbox, Switch, Table} from '@mantine/core';
import {T} from '../../../../../../components/T';
import {LoadingRows} from '../../../../../../components/Table/LoadingRows';
import {Requirements} from '../../requirement/GuildRequirementList';
import {successNotification} from '../../../../../../utils/notificationHelper';

type EventDetailRequirementListsProps = {
	id: EventTypeDto['id'];
};

export function EventDetailRequirementLists(props: Readonly<EventDetailRequirementListsProps>): JSX.Element {
	const {id} = props;
	const {guildId} = useGuildPage();

	const getRequirementLists = () => slotbotServerClient.get(`/requirement-list/${guildId}/event-type/${id}`)
		.then((res) => res.data);
	const {data, isLoading} = useQuery<EventTypeRequirementListDto[], Error>({
		queryKey: ['eventTypeRequirementLists', guildId, id],
		queryFn: getRequirementLists,
	});

	const queryClient = useQueryClient();
	const putEventTypeRequirementList = ({listId, active}: {
		listId: EventTypeRequirementListDto['id'],
		active: EventTypeRequirementListDto['active']
	}) => slotbotServerClient
		.put(`/events/types/${guildId}/${id}/requirement-list/${listId}/${active}`).then(voidFunction);
	const {mutate, isPending} = useMutation<void, Error, {
		listId: EventTypeRequirementListDto['id'],
		active: EventTypeRequirementListDto['active']
	}>({
		mutationFn: putEventTypeRequirementList,
		onSuccess: (_, variables) => {
			successNotification();
			queryClient.setQueryData(['eventTypeRequirementLists', guildId, id], (oldData: EventTypeRequirementListDto[]) => {
				return oldData.map((list) => {
					if (list.id === variables.listId) {
						return {...list, active: variables.active};
					}
					return list;
				});
			});
		},
	});

	return <Table highlightOnHover stickyHeader>
		<Table.Thead>
			<Table.Tr>
				<Table.Th><T k={'guild.requirementList.name'}/></Table.Th>
				<Table.Th><T k={'guild.requirementList.memberAssignable'}/></Table.Th>
				<Table.Th><T k={'guild.requirementList.enforced'}/></Table.Th>
				<Table.Th><T k={'guild.requirementList'}/></Table.Th>
				<Table.Th><T k={'event.details.default.type.boolean'}/></Table.Th>
			</Table.Tr>
		</Table.Thead>
		<Table.Tbody>
			{isLoading ?
				<LoadingRows columns={5}/>
				:
				data?.map((list) => (
					<Table.Tr key={list.id}>
						<Table.Td>
							{list.name}
						</Table.Td>
						<Table.Td>
							<Checkbox.Indicator checked={list.memberAssignable}/>
						</Table.Td>
						<Table.Td>
							<Checkbox.Indicator checked={list.enforced}/>
						</Table.Td>
						<Table.Td>
							<Requirements requirements={list.requirements}/>
						</Table.Td>
						<Table.Td>
							<Switch checked={list.active} disabled={isPending} onChange={(event) => mutate({
								listId: list.id,
								active: event.currentTarget.checked,
							})}/>
						</Table.Td>
					</Table.Tr>
				))}
		</Table.Tbody>
	</Table>;
}
