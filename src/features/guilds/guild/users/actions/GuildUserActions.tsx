import {Group} from '@mantine/core';
import {TableCellProps} from '../GuildUsers';
import {useGuildPage} from '../../../../../contexts/guild/GuildPageContext';
import {JSX} from 'react';
import {RequirementsGuildUser} from './RequirementsGuildUser';
import {RemoveGuildUser} from './RemoveGuildUser';
import {BanGuildUser} from './BanGuildUser';
import {FeatureFlag} from '../../../../featureFlag/useGetFeatureFlags';
import {RequireFeatureFlag} from '../../../../featureFlag/RequireFeatureFlag';

type GuildUserActionsProps = TableCellProps;

export type GuildUserActionProps =
	Pick<GuildUserActionsProps['row']['original'], 'user'>
	& Pick<ReturnType<typeof useGuildPage>, 'guildId'>;

export default function GuildUserActions({row: {original: {user}}}: Readonly<GuildUserActionsProps>): JSX.Element {
	const {guildId} = useGuildPage();

	const actionProps = {user, guildId};
	return <Group justify={'right'} gap={'xs'}>
		<RequireFeatureFlag feature={FeatureFlag.REQUIREMENTS}>
			<RequirementsGuildUser {...actionProps}/>
		</RequireFeatureFlag>
		<RemoveGuildUser {...actionProps}/>
		<BanGuildUser {...actionProps}/>
	</Group>;
}
