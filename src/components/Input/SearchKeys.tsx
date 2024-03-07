import {Group, GroupProps, Kbd} from '@mantine/core';
import {T} from '../T';
import {useOs} from '@mantine/hooks';
import {JSX} from 'react';

type SearchKeysProps = Pick<GroupProps, 'visibleFrom'>

/**
 * Displays keys needed for opening a search
 */
export function SearchKeys(props: Readonly<SearchKeysProps>): JSX.Element {
	const os = useOs();

	return <Group wrap={'nowrap'} gap={3} {...props}><Kbd>{os === 'undetermined' || os === 'macos' ? '⌘' :
		<T k={'key.ctrl'}/>}</Kbd> + <Kbd>K</Kbd></Group>;
}
