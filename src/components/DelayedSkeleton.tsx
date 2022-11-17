import {useEffect, useState} from 'react';
import {Skeleton, SkeletonProps} from '@mantine/core';

type DelayedSkeletonProps = SkeletonProps & {
	/**
	 * Delay for the skeletons in ms.
	 * @default 700
	 * */
	delay?: number;
};

/**
 * Shows skeletons after a delay
 * */
export function DelayedSkeleton(props: DelayedSkeletonProps): JSX.Element {
	const {delay = 700, ...skeletonProps} = props;

	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setVisible(true), delay);
		return (): void => {
			clearTimeout(timer);
		};
	}, [props]);

	if (visible) {
		return <Skeleton {...skeletonProps} />;
	}
	return <></>;
}
