import {Skeleton, SkeletonProps} from '@mantine/core';
import {Delayed} from './Delayed';

/**
 * Shows a skeleton after a delay
 *
 * @see {@link Delayed}
 */
export function DelayedSkeleton(props: SkeletonProps): JSX.Element {
	return <Delayed component={Skeleton} {...props}/>;
}
