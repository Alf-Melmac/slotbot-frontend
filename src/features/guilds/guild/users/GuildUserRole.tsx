import {TableCellProps} from './GuildUsers';
import {DefaultMantineColor} from '@mantine/core';
import {JSX} from 'react';
import {useGuildPage} from '../../../../contexts/guild/GuildPageContext';
import {Role, UserInGuildDto} from '../../guildTypes';
import {TextKey, useLanguage} from '../../../../contexts/language/Language';
import slotbotServerClient, {voidFunction} from '../../../../hooks/slotbotServerClient';
import {InfiniteData, useMutation, useQueryClient} from '@tanstack/react-query';
import {errorNotification, successNotification} from '../../../../utils/notificationHelper';
import {AxiosError} from 'axios';
import {GuildUserRoleSelect} from './GuildUserRoleSelect';
import {GuildUserRoleSelected} from './GuildUserRoleSelected';
import {FrontendPageable} from '../../../../utils/pagination';
import {useAuth} from '../../../../contexts/authentication/AuthProvider';

export type RoleItem = {
	value: Role | '';
	label: string;
	description?: TextKey;
	color: DefaultMantineColor;
}

export function GuildUserRole(props: Readonly<TableCellProps>): JSX.Element {
	const {role, user} = props.row.original;
	const roleValue = role ?? '';

	const {t} = useLanguage();
	const roles: RoleItem[] = [
		{
			value: Role.ADMINISTRATOR,
			label: t('user.role.admin'),
			description: 'user.role.admin.description',
			color: 'pink',
		},
		{
			value: Role.EVENT_MANAGE,
			label: t('user.role.eventManage'),
			description: 'user.role.eventManage.description',
			color: 'cyan',
		},
		{value: '', label: t('user.role.member'), color: 'blue'},
	];

	const {guildId, isAdmin} = useGuildPage();
	const {user: currentUser} = useAuth();
	const queryClient = useQueryClient();
	const putRole = (newRole: string) => slotbotServerClient.put(`/guilds/${guildId}/users/${user.id}`, newRole,
		{headers: {'Content-Type': 'text/plain'}}).then(voidFunction);
	const {mutate, isPending, variables} = useMutation<void, AxiosError, string>({
		mutationFn: putRole,
		onSuccess: (_, sentRole) => {
			queryClient.setQueryData<InfiniteData<FrontendPageable<UserInGuildDto>>>(['guildUsers', guildId], (oldData) => {
				if (!oldData) {
					return oldData;
				}

				const newRole = sentRole ? sentRole as Role : null;
				return {
					...oldData,
					pages: oldData.pages.map((page) => ({
						...page,
						content: page.content.map((item) => item.user.id === user.id ? {...item, role: newRole} : item),
					})),
				};
			});
			// Only update to myself updates my authorities
			if (user.id === currentUser?.id) {
				void queryClient.invalidateQueries({queryKey: ['authentication']});
			}
			successNotification();
		},
		onError: errorNotification,
	});

	// Show requested role while the request is running; otherwise role from cache
	const displayedRole = isPending ? variables : roleValue;

	function changeRole(newRole: string) {
		if (newRole !== displayedRole) {
			mutate(newRole);
		}
	}

	const matchingRole = roles.find(roleItem => roleItem.value === displayedRole);
	if (!matchingRole) throw new Error(`Role '${displayedRole}' not found`);
	if (!isAdmin) {
		return <GuildUserRoleSelected role={matchingRole}/>;
	}

	return (
		<GuildUserRoleSelect roles={roles} matchingRole={matchingRole} onChange={changeRole}/>
	);
}
