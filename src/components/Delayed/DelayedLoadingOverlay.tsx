import {LoadingOverlay, LoadingOverlayProps} from '@mantine/core';
import {Delayed} from './Delayed';
import {JSX} from 'react';

/**
 * Shows a loading overlay after a delay
 *
 * @see {@link Delayed}
 */
export function DelayedLoadingOverlay(props: Readonly<LoadingOverlayProps>): JSX.Element {
	return <Delayed component={LoadingOverlay} {...props}/>;
}
