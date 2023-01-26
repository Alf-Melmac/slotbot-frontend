import {Group, Kbd} from '@mantine/core';
import {T} from '../T';
import {useOs} from '@mantine/hooks';

/**
 * Displays keys needed for opening a search
 */
export function SearchKeys(): JSX.Element {
	const os = useOs();

	return <Group noWrap spacing={3}><Kbd>{os === 'undetermined' || os === 'macos' ? '⌘' :
		<T k={'key.ctrl'}/>}</Kbd> + <Kbd>K</Kbd></Group>;
}
