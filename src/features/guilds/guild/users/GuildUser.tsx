import {AnchorLink} from '../../../../components/Text/AnchorLink';
import {Avatar, Group} from '@mantine/core';
import {TableCellProps} from './GuildUsers';
import {JSX} from 'react';

export function GuildUser(props: Readonly<TableCellProps>): JSX.Element {
	const {id, avatarUrl, name} = props.row.original.user;

	return <AnchorLink to={`/profile/${id}`}>
		<Group spacing={'sm'}>
			<Avatar src={avatarUrl} radius={40}/>
			{name}
		</Group>
	</AnchorLink>;
}
