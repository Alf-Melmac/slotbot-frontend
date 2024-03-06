import {Badge} from '@mantine/core';
import {RoleItem} from './GuildUserRole';
import {JSX} from 'react';

type GuildUserRoleSelectedProps = {
	role: RoleItem;
};

export function GuildUserRoleSelected({role}: Readonly<GuildUserRoleSelectedProps>): JSX.Element {
	return <Badge color={role.color}>{role.label}</Badge>;
}
