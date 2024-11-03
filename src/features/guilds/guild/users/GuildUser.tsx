import {AnchorLink} from '../../../../components/Text/AnchorLink';
import {Avatar, Group} from '@mantine/core';
import {TableCellProps} from './GuildUsers';
import {JSX} from 'react';
import {DiscordUserDto} from '../../../../contexts/authentication/authenticationTypes';

export function GuildUserCell(props: Readonly<TableCellProps>): JSX.Element {
	return <GuildUser {...props.row.original.user}/>;
}

export function GuildUser(props: Readonly<DiscordUserDto>) {
	const {id, avatarUrl, name} = props;

	return <AnchorLink to={`/profile/${id}`}>
		<Group gap={'sm'}>
			<Avatar src={avatarUrl} radius={40}/>
			{name}
		</Group>
	</AnchorLink>;
}
