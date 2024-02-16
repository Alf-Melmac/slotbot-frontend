import {Group, Kbd} from '@mantine/core';
import {T} from '../T';
import {useOs} from '@mantine/hooks';
import {JSX} from 'react';

/**
 * Displays keys needed for opening a search
 */
export function SearchKeys(): JSX.Element {
	const os = useOs();

	return <Group wrap={'nowrap'} gap={3}><Kbd>{os === 'undetermined' || os === 'macos' ? '⌘' :
		<T k={'key.ctrl'}/>}</Kbd> + <Kbd>K</Kbd></Group>;
}
