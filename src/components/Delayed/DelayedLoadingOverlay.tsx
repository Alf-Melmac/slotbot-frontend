import {LoadingOverlay, LoadingOverlayProps} from '@mantine/core';
import {Delayed} from './Delayed';

/**
 * Shows a loading overlay after a delay
 *
 * @see {@link Delayed}
 */
export function DelayedLoadingOverlay(props: LoadingOverlayProps): JSX.Element {
	return <Delayed component={LoadingOverlay} {...props}/>;
}
