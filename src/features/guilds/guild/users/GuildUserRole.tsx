import {TableCellProps} from './GuildUsers';
import {DefaultMantineColor} from '@mantine/core';
import {JSX, useState} from 'react';
import {useGuildPage} from '../../../../contexts/guild/GuildPageContext';
import {Role} from '../../guildTypes';
import {TextKey, useLanguage} from '../../../../contexts/language/Language';
import slotbotServerClient, {voidFunction} from '../../../../hooks/slotbotServerClient';
import {useMutation} from '@tanstack/react-query';
import {errorNotification, successNotification} from '../../../../utils/notificationHelper';
import {AxiosError} from 'axios';
import {useDidUpdate} from '@mantine/hooks';
import {GuildUserRoleSelect} from './GuildUserRoleSelect';
import {GuildUserRoleSelected} from './GuildUserRoleSelected';

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
	const putRole = () => slotbotServerClient.put(`/guilds/${guildId}/users/${user.id}`, selectedRole,
		{headers: {'Content-Type': 'text/plain'}}).then(voidFunction);
	const {mutate} = useMutation<void, AxiosError>({
		mutationFn: putRole,
		onSuccess: () => {
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
