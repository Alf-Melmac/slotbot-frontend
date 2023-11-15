import {Skeleton, SkeletonProps} from '@mantine/core';
import {Delayed} from './Delayed';
import {JSX} from 'react';

/**
 * Shows a skeleton after a delay
 *
 * @see {@link Delayed}
 */
export function DelayedSkeleton(props: Readonly<SkeletonProps>): JSX.Element {
	return <Delayed component={Skeleton} {...props}/>;
}
