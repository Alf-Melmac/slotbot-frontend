import {Group, Kbd} from '@mantine/core';
import {T} from '../T';

/**
 * Space needed to display {@link SearchKeys}
 */
export const SEARCH_KEYS_WIDTH = 90;
/**
 * Space needed to display {@link SearchKeys} if the parent element has rounded corners
 */
export const SEARCH_KEYS_WIDTH_ROUND = 95;

/**
 * Displays keys needed for opening a search
 */
export function SearchKeys(): JSX.Element {
	return <Group noWrap spacing={3}><Kbd><T k={'key.ctrl'}/></Kbd> + <Kbd>K</Kbd></Group>;
}
