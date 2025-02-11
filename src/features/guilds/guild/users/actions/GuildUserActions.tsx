import {Group} from '@mantine/core';
import {TableCellProps} from '../GuildUsers';
import {useGuildPage} from '../../../../../contexts/guild/GuildPageContext';
import {useQueryClient} from '@tanstack/react-query';
import {JSX} from 'react';
import {SharedModalChild} from '../../../../../components/SharedModal';
import {RequirementsGuildUser} from './RequirementsGuildUser';
import {RemoveGuildUser} from './RemoveGuildUser';
import {BanGuildUser} from './BanGuildUser';

type GuildUserActionsProps = TableCellProps & SharedModalChild;

export type GuildUserActionProps =
	Pick<GuildUserActionsProps, 'openModal' | 'closeModal'>
	& Pick<GuildUserActionsProps['row']['original'], 'user'>
	& Pick<ReturnType<typeof useGuildPage>, 'guildId'>
	& { queryClient: ReturnType<typeof useQueryClient> };

export default function GuildUserActions({
											 row: {original: {user}},
											 openModal,
											 closeModal,
										 }: Readonly<GuildUserActionsProps>): JSX.Element {
	const {guildId} = useGuildPage();
	const queryClient = useQueryClient();

	const actionProps = {user, guildId, queryClient, openModal, closeModal};
	return <Group justify={'right'} gap={'xs'}>
		<RequirementsGuildUser {...actionProps}/>
		<RemoveGuildUser {...actionProps}/>
		<BanGuildUser {...actionProps}/>
	</Group>;
}
