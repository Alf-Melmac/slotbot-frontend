import {ActionIcon, Button, Group, Stack, Switch, Table, Title, Tooltip} from '@mantine/core';
import {TableCellProps} from './GuildUsers';
import {useGuildPage} from '../../../../contexts/guild/GuildPageContext';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import slotbotServerClient, {voidFunction} from '../../../../hooks/slotbotServerClient';
import {AxiosError} from 'axios';
import {showNotification} from '@mantine/notifications';
import {T} from '../../../../components/T';
import {errorNotification, successNotification} from '../../../../utils/notificationHelper';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGavel, faUserMinus, faUserTag} from '@fortawesome/free-solid-svg-icons';
import {Fragment, JSX} from 'react';
import {TextareaMaxLength} from '../../../../components/Input/MaxLength/TextareaMaxLength';
import {REASON} from '../../../../utils/maxLength';
import {useField} from '@mantine/form';
import {maxLengthField} from '../../../../utils/formValidation';
import {SharedModalChild} from '../../../../components/SharedModal';
import {ManagedRequirementListDto} from '../config/requirement/requirementTypes';
import {Requirement} from '../../../requirements/Requirements';
import {LoadingRows} from '../../../../components/Table/LoadingRows';

type GuildUserActionsProps = TableCellProps & SharedModalChild;

export function GuildUserActions({
									 row: {original: {user}},
									 openModal,
									 closeModal,
								 }: Readonly<GuildUserActionsProps>): JSX.Element {
	const {guildId} = useGuildPage();
	const queryClient = useQueryClient();

	const actionProps = {user, guildId, queryClient, openModal, closeModal};
	return <Group justify={'right'} gap={'xs'}>
		<RequirementsGuildUser {...actionProps}/>
		<RemoveGuildUser {...actionProps}/>
		<BanGuildUser {...actionProps}/>
	</Group>;
}

type GuildUserActionProps =
	Pick<GuildUserActionsProps, 'openModal' | 'closeModal'>
	& Pick<GuildUserActionsProps['row']['original'], 'user'>
	& Pick<ReturnType<typeof useGuildPage>, 'guildId'>
	& { queryClient: ReturnType<typeof useQueryClient> };

function RequirementsGuildUser(props: Readonly<GuildUserActionProps>): JSX.Element {
	const {user, guildId, openModal} = props;

	const hasManagedRequirementLists = () => slotbotServerClient.get(`/requirement-list/guild/${guildId}`)
		.then((res) => res.data);
	const {data} = useQuery<boolean, Error>({
		queryKey: ['hasManagedRequirementLists', guildId],
		queryFn: hasManagedRequirementLists,
	});
	if (data === false) {
		return <></>;
	}

	return <Tooltip label={<T k={'guild.user.manageRequirements'}/>}>
		<ActionIcon color={'gray'} variant={'subtle'}
					onClick={() => openModal(
						<T k={'guild.user.manageRequirements.title'} args={[user.name]}/>,
						<RequirementsGuildUserModal {...props}/>,
					)}>
			<FontAwesomeIcon icon={faUserTag}/>
		</ActionIcon>
	</Tooltip>;
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
	const {user, guildId, queryClient, openModal, closeModal} = props;

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

	return <Tooltip label={<T k={'guild.user.ban'}/>}>
		<ActionIcon color={'red'} variant={'subtle'}
					onClick={() => openModal(
						<T k={'guild.user.ban.title'} args={[user.name]}/>,
						<Stack>
							<T k={'guild.user.ban.description'} html/>
							<TextareaMaxLength label={<T k={'guild.user.ban.reason'}/>} maxLength={REASON} autosize
											   minRows={2}
											   key={field.key} {...field.getInputProps()}/>
							<Group justify={'flex-end'}>
								<Button variant={'default'} onClick={closeModal}><T k={'action.cancel'}/></Button>
								<Button color={'red'} onClick={() => mutate(field.getValue())}>
									<T k={'guild.user.ban.action'}/>
								</Button>
							</Group>
						</Stack>,
					)}>
			<FontAwesomeIcon icon={faGavel}/>
		</ActionIcon>
	</Tooltip>;
}
