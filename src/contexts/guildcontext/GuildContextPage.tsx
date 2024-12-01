import {JSX, PropsWithChildren} from 'react';
import {useParams} from 'react-router';
import {useGuildContext} from './GuildContext';

export const GUILD_CONTEXT_PATH_PARAM = ':tenant';

export function GuildContextPage(props: Readonly<PropsWithChildren>): JSX.Element {
	const params = useParams<{tenant: string}>();
	const {setGuild} = useGuildContext();
	setGuild(params.tenant ?? '');

	return <>{props.children}</>;
}
