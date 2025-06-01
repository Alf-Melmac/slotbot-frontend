import {Fragment, JSX} from 'react';
import slotbotServerClient, {voidFunction} from '../../../../../hooks/slotbotServerClient';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {ActionIcon, Modal, Stack, Switch, Table, Title, Tooltip} from '@mantine/core';
import {T} from '../../../../../components/T';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserTag} from '@fortawesome/free-solid-svg-icons';
import {ManagedRequirementListDto} from '../../config/requirement/requirementTypes';
import {AxiosError} from 'axios';
import {errorNotification, successNotification} from '../../../../../utils/notificationHelper';
import {LoadingRows} from '../../../../../components/Table/LoadingRows';
import {Requirement} from '../../../../requirements/Requirements';
import {GuildUserActionProps} from './GuildUserActions';
import {useDisclosure} from '@mantine/hooks';

export function RequirementsGuildUser(props: Readonly<GuildUserActionProps>): JSX.Element {
	const {user, guildId} = props;
	const [opened, {open, close}] = useDisclosure(false);

	const hasManagedRequirementLists = () => slotbotServerClient.get(`/requirement-list/guild/${guildId}`)
		.then((res) => res.data);
	const {data} = useQuery<boolean, Error>({
		queryKey: ['hasManagedRequirementLists', guildId],
		queryFn: hasManagedRequirementLists,
	});
	if (data === false) {
		return <></>;
	}

	return <>
		<Modal opened={opened} onClose={close} title={<T k={'guild.user.manageRequirements.title'} args={[user.name]}/>}>
			<RequirementsGuildUserModal {...props}/>
		</Modal>
		<Tooltip label={<T k={'guild.user.manageRequirements'}/>}>
			<ActionIcon color={'gray'} variant={'subtle'}
						onClick={open}>
				<FontAwesomeIcon icon={faUserTag}/>
			</ActionIcon>
		</Tooltip>
	</>;
}

function RequirementsGuildUserModal({user, guildId}: Readonly<GuildUserActionProps>): JSX.Element {
	const getManagedRequirementLists = () => slotbotServerClient.get(`/requirement-list/guild/${guildId}/user/${user.id}`)
		.then((res) => res.data);
	const {data, isLoading} = useQuery<ManagedRequirementListDto[], Error>({
		queryKey: ['managedRequirementLists', guildId, user.id],
		queryFn: getManagedRequirementLists,
	});

	const queryClient = useQueryClient();
	const putManagedRequirement = ({requirementId, fulfilled}: {
		requirementId: number,
		fulfilled: boolean
	}) => slotbotServerClient
		.put(`/requirements/${requirementId}/guild/${guildId}/user/${user.id}/${fulfilled}`).then(voidFunction);
	const {mutate, isPending} = useMutation<void, AxiosError, { requirementId: number, fulfilled: boolean }>({
		mutationFn: putManagedRequirement,
		onSuccess: (_, {requirementId, fulfilled}) => {
			queryClient.setQueryData(['managedRequirementLists', guildId, user.id], (oldData: ManagedRequirementListDto[]) => {
				return oldData.map((list) => {
					return {
						...list,
						requirements: list.requirements.map((requirement) => {
							if (requirement.id === requirementId) {
								return {...requirement, fulfilled};
							}
							return requirement;
						}),
					};
				});
			});
			successNotification();
		},
		onError: errorNotification,
	});

	return <Stack>
		<T k={'guild.user.manageRequirements.description'}/>
		<Table highlightOnHover stickyHeader stickyHeaderOffset={60}>
			<Table.Thead>
				<Table.Tr>
					<Table.Th><T k={'guild.requirementList'}/></Table.Th>
					<Table.Th><T k={'Erfüllt'}/></Table.Th>
				</Table.Tr>
			</Table.Thead>
			<Table.Tbody>
				{isLoading ?
					<LoadingRows columns={2}/>
					:
					data?.map((list) => (
						<Fragment key={list.id}>
							<Table.Tr>
								<Table.Td><Title order={3}>{list.name}</Title></Table.Td>
							</Table.Tr>
							{list.requirements.map((requirement) => (
								<Table.Tr key={requirement.id}>
									<Table.Td><Requirement requirement={requirement} gap={'sm'}/></Table.Td>
									<Table.Td>
										<Switch checked={requirement.fulfilled}
												disabled={isPending}
												onChange={(event) => mutate({
													requirementId: requirement.id,
													fulfilled: event.currentTarget.checked,
												})}/>
									</Table.Td>
								</Table.Tr>
							))}
						</Fragment>
					))
				}
			</Table.Tbody>
		</Table>
	</Stack>;
}
