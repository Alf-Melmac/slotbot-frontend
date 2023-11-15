import {TableCellProps} from './GuildUsers';
import {Badge, DefaultMantineColor, Select, SelectItemProps, Stack, Text} from '@mantine/core';
import {forwardRef, JSX, useState} from 'react';
import {useGuildPage} from '../../../../contexts/guild/GuildPageContext';
import {Role} from '../../guildTypes';
import {TextKey, useLanguage} from '../../../../contexts/language/Language';
import {T} from '../../../../components/T';
import slotbotServerClient, {voidFunction} from '../../../../hooks/slotbotServerClient';
import {useMutation} from '@tanstack/react-query';
import {errorNotification, successNotification} from '../../../../utils/notificationHelper';
import {AxiosError} from 'axios';
import {useDidUpdate} from '@mantine/hooks';

type RoleItem = {
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

	if (!isAdmin) {
		const matchingRole = roles.find(roleItem => roleItem.value === roleValue);
		if (!matchingRole) throw new Error(`Role '${roleValue}' not found`);
		return <Badge color={matchingRole.color}>{matchingRole.label}</Badge>;
	}

	return (
		<Select data={roles} value={selectedRole} onChange={setSelectedRole} variant={'unstyled'}
				itemComponent={GuildUserRoleSelection}
				maw={200} withinPortal styles={(theme) => ({
			item: {
				'&[data-selected]': {
					'&, &:hover': {
						backgroundColor: theme.colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.gray[4],
						color: theme.colorScheme === 'dark' ? theme.white : theme.colors.gray[9],
					},
				},
			},
		})}/>
	);
}

type ItemProps = SelectItemProps & RoleItem;

const GuildUserRoleSelection = forwardRef<HTMLDivElement, ItemProps>(
	({value, label, description, color, ...others}, ref) => (
		<Stack ref={ref} spacing={'xs'} {...others}>
			<Badge color={color} variant={'filled'}>
				{label}
			</Badge>
			{description &&
                <Text size={'xs'} opacity={0.65}><T k={description}/></Text>
			}
		</Stack>
	),
);
