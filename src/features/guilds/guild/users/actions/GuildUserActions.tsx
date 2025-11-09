import {Group} from '@mantine/core';
import {TableCellProps} from '../GuildUsers';
import {useGuildPage} from '../../../../../contexts/guild/GuildPageContext';
import {JSX} from 'react';
import {RequirementsGuildUser} from './RequirementsGuildUser';
import {RemoveGuildUser} from './RemoveGuildUser';
import {BanGuildUser} from './BanGuildUser';

type GuildUserActionsProps = TableCellProps;

export type GuildUserActionProps =
	Pick<GuildUserActionsProps['row']['original'], 'user'>
	& Pick<ReturnType<typeof useGuildPage>, 'guildId'>;

export default function GuildUserActions({row: {original: {user}}}: Readonly<GuildUserActionsProps>): JSX.Element {
	const {guildId} = useGuildPage();

	const actionProps = {user, guildId};
	return <Group justify={'right'} gap={'xs'}>
		<RequirementsGuildUser {...actionProps}/>
		<RemoveGuildUser {...actionProps}/>
		<BanGuildUser {...actionProps}/>
	</Group>;
}
