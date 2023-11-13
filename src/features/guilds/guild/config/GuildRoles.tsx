import {GuildConfigDto, GuildDiscordIntegrationDto} from '../../guildTypes';
import {Box, createStyles, Group, Select, Skeleton, Spoiler, TextInput} from '@mantine/core';
import {T} from '../../../../components/T';
import {useLanguage} from '../../../../contexts/language/Language';
import {useGetDiscordIntegration} from '../useGetGuild';
import {useGuildPage} from '../../../../contexts/guild/GuildPageContext';
import {Dispatch, PropsWithChildren, SetStateAction, useState} from 'react';
import slotbotServerClient from '../../../../hooks/slotbotServerClient';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {errorNotification, successNotification} from '../../../../utils/notificationHelper';
import {useDidUpdate} from '@mantine/hooks';

export function GuildRoles(props: GuildConfigDto): JSX.Element {
	const {memberRole, eventManageRole, adminRole} = props;
	const {guildId} = useGuildPage();

	const [roleMember, setRoleMember] = useState<string | null>(memberRole);
	const [roleEventManage, setRoleEventManage] = useState<string | null>(eventManageRole);
	const [roleAdmin, setRoleAdmin] = useState<string | null>(adminRole);

	const integrationQuery = useGetDiscordIntegration(guildId);
	if (integrationQuery.isError) return <GuildRolesPageWrapper>
		<RoleSelectLoadingError roleName={'member'} role={roleMember}/>
		<RoleSelectLoadingError roleName={'eventManage'} role={roleEventManage}/>
		<RoleSelectLoadingError roleName={'admin'} role={roleAdmin}/>
	</GuildRolesPageWrapper>;
	if (integrationQuery.isLoading || !integrationQuery.data) return <GuildRolesPageWrapper>
		<Skeleton height={80.2}/>
		<Skeleton height={80.2}/>
		<Skeleton height={80.2}/>
	</GuildRolesPageWrapper>;
	const {connected, roles} = integrationQuery.data;
	if (!connected) return <></>;

	return <GuildRolesPageWrapper>
		<RoleSelect roleName={'member'} role={roleMember} setRole={setRoleMember} roles={roles}/>
		<RoleSelect roleName={'eventManage'} role={roleEventManage} setRole={setRoleEventManage} roles={roles}/>
		<RoleSelect roleName={'admin'} role={roleAdmin} setRole={setRoleAdmin} roles={roles}/>
	</GuildRolesPageWrapper>;
}

type RoleSelectType = {
	roleName: string;
	role: string | null;
	setRole: Dispatch<SetStateAction<RoleSelectType['role']>>;
} & Pick<GuildDiscordIntegrationDto, 'roles'>

function RoleSelect(props: RoleSelectType): JSX.Element {
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

function RoleSelectLoadingError(props: Pick<RoleSelectType, 'roleName' | 'role'>): JSX.Element {
	const {roleName, role} = props;

	return <TextInput label={<T k={`user.role.${roleName}`}/>}
					  description={<T k={`user.role.${roleName}.description`}/>}
					  error={<T k={'guild.config.role.loadingError'}/>} disabled value={role ?? '—'}/>;
}

const useStyles = createStyles((theme) => ({
	description: {
		fontSize: theme.fontSizes.sm,
		display: 'flex',
		'& > button': {
			flexShrink: 0,
		},
	},
}));

function GuildRolesPageWrapper(props: PropsWithChildren): JSX.Element {
	const {classes} = useStyles();

	return <Box>
		<Spoiler maxHeight={22} hideLabel={<T k={'spoiler.less'}/>} showLabel={<T k={'spoiler.more'}/>}
				 className={classes.description}>
			<T k={'guild.config.roles.description'}/>
		</Spoiler>
		<Group grow>
			{props.children}
		</Group>
	</Box>;
}
