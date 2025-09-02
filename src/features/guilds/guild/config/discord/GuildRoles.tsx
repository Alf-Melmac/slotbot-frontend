import {GuildConfigDto, GuildDiscordIntegrationDto} from '../../../guildTypes';
import {Select, Skeleton, Stack, TextInput} from '@mantine/core';
import {T} from '../../../../../components/T';
import {useLanguage} from '../../../../../contexts/language/Language';
import {useGuildPage} from '../../../../../contexts/guild/GuildPageContext';
import {Dispatch, JSX, SetStateAction, useState} from 'react';
import slotbotServerClient from '../../../../../hooks/slotbotServerClient';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {errorNotification, successNotification} from '../../../../../utils/notificationHelper';
import {useDidUpdate} from '@mantine/hooks';
import {GuildRolesPageWrapper} from './GuildRolesPageWrapper';
import {useGuildDiscordConfig} from '../../../../../contexts/guild/GuildDiscordConfigContext';
import {GuildRolesSync} from './GuildRolesSync';

export function GuildRoles(props: Readonly<GuildConfigDto>): JSX.Element {
	const {memberRole, eventManageRole, adminRole} = props;

	const [roleMember, setRoleMember] = useState<string | null>(memberRole);
	const [roleEventManage, setRoleEventManage] = useState<string | null>(eventManageRole);
	const [roleAdmin, setRoleAdmin] = useState<string | null>(adminRole);

	const integrationQuery = useGuildDiscordConfig();
	if (integrationQuery.isError) return <GuildRolesPageWrapper>
		<RoleSelectLoadingError roleName={'member'} role={roleMember}/>
		<RoleSelectLoadingError roleName={'eventManage'} role={roleEventManage}/>
		<RoleSelectLoadingError roleName={'admin'} role={roleAdmin}/>
	</GuildRolesPageWrapper>;
	if (integrationQuery.isLoading || !integrationQuery.data) return <Stack>
		<GuildRolesPageWrapper>
			<Skeleton height={80.2}/>
			<Skeleton height={80.2}/>
			<Skeleton height={80.2}/>
		</GuildRolesPageWrapper>
		<Skeleton height={36}/>
	</Stack>;

	const {roles} = integrationQuery.data;
	return <Stack>
		<GuildRolesPageWrapper
			warning={!integrationQuery.data.allowedToManageRoles ? 'guild.config.role.noPermission' : undefined}>
			<RoleSelect roleName={'member'} role={roleMember} setRole={setRoleMember} roles={roles}/>
			<RoleSelect roleName={'eventManage'} role={roleEventManage} setRole={setRoleEventManage} roles={roles}/>
			<RoleSelect roleName={'admin'} role={roleAdmin} setRole={setRoleAdmin} roles={roles}/>
		</GuildRolesPageWrapper>
		{(roleMember || roleEventManage || roleAdmin) &&
            <GuildRolesSync/>
		}
	</Stack>;
}

type RoleSelectType = {
	roleName: string;
	role: string | null;
	setRole: Dispatch<SetStateAction<RoleSelectType['role']>>;
} & Pick<GuildDiscordIntegrationDto, 'roles'>

function RoleSelect(props: Readonly<RoleSelectType>): JSX.Element {
	const {roleName, role, setRole, roles} = props;
	const {guildId} = useGuildPage();
	const {t} = useLanguage();

	const putGuildConfig = () => slotbotServerClient.put(`/guilds/${guildId}/config`, {[`${roleName}Role`]: role}).then((res) => res.data);
	const {mutate} = useMutation<void, AxiosError>({
		mutationFn: putGuildConfig,
		onSuccess: () => {
			successNotification();
		},
		onError: errorNotification,
	});

	useDidUpdate(() => {
		mutate();
	}, [role]);

	return <Select label={<T k={`user.role.${roleName}`}/>} description={<T k={`user.role.${roleName}.description`}/>}
				   placeholder={t('guild.config.role.select')} clearable searchable value={role} onChange={setRole}
				   error={role && roles.find(roleItem => roleItem.id === role) === undefined ? t('guild.config.role.error') : undefined}
				   data={roles.map(role => ({
					   value: role.id,
					   label: role.name,
				   }))}/>;
}

function RoleSelectLoadingError(props: Readonly<Pick<RoleSelectType, 'roleName' | 'role'>>): JSX.Element {
	const {roleName, role} = props;

	return <TextInput label={<T k={`user.role.${roleName}`}/>}
					  description={<T k={`user.role.${roleName}.description`}/>}
					  error={<T k={'guild.config.role.loadingError'}/>} disabled value={role ?? '—'}/>;
}
