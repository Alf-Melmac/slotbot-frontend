import {TableCellProps} from './GuildUsers';
import {DefaultMantineColor} from '@mantine/core';
import {JSX, useState} from 'react';
import {useGuildPage} from '../../../../contexts/guild/GuildPageContext';
import {Role, UserInGuildDto} from '../../guildTypes';
import {TextKey, useLanguage} from '../../../../contexts/language/Language';
import slotbotServerClient, {voidFunction} from '../../../../hooks/slotbotServerClient';
import {InfiniteData, useMutation, useQueryClient} from '@tanstack/react-query';
import {errorNotification, successNotification} from '../../../../utils/notificationHelper';
import {AxiosError} from 'axios';
import {useDidUpdate} from '@mantine/hooks';
import {GuildUserRoleSelect} from './GuildUserRoleSelect';
import {GuildUserRoleSelected} from './GuildUserRoleSelected';
import {FrontendPageable} from '../../../../utils/pagination';

export type RoleItem = {
	value: Role | '';
	label: string;
	description?: TextKey;
	color: DefaultMantineColor;
}

export function GuildUserRole(props: Readonly<TableCellProps>): JSX.Element {
	const {role, user} = props.row.original;
	const roleValue = role ?? '';
	const [selectedRole, setSelectedRole] = useState<string | null>(roleValue);

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
	const queryClient = useQueryClient();
	const putRole = () => slotbotServerClient.put(`/guilds/${guildId}/users/${user.id}`, selectedRole,
		{headers: {'Content-Type': 'text/plain'}}).then(voidFunction);
	const {mutate} = useMutation<void, AxiosError>({
		mutationFn: putRole,
		onSuccess: () => {
			queryClient.setQueryData<InfiniteData<FrontendPageable<UserInGuildDto>>>(['guildUsers', guildId], (oldData) => {
				if (!oldData) {
					return oldData;
				}

				const newRole = selectedRole ? selectedRole as Role : null;
				return {
					...oldData,
					pages: oldData.pages.map((page) => ({
						...page,
						content: page.content.map((item) => item.user.id === user.id ? {...item, role: newRole} : item),
					})),
				};
			});
			successNotification();
		},
		onError: errorNotification,
	});

	useDidUpdate(() => {
		mutate();
	}, [selectedRole]);

	const matchingRole = roles.find(roleItem => roleItem.value === selectedRole);
	if (!matchingRole) throw new Error(`Role '${roleValue}' not found`);
	if (!isAdmin) {
		return <GuildUserRoleSelected role={matchingRole}/>;
	}

	return (
		<GuildUserRoleSelect roles={roles} matchingRole={matchingRole} setSelectedRole={setSelectedRole}/>
	);
}
