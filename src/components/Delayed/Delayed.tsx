import {useEffect, useState} from 'react';
import {LoadingOverlayProps, SkeletonProps} from '@mantine/core';

type DelayedComponentProps = SkeletonProps | LoadingOverlayProps;
type DelayedProps<ComponentProps extends DelayedComponentProps> = ComponentProps & {
	component: any;
};

/**
 * Shows children after this delay
 */
export const DELAY = 700;

/**
 * Shows children after a delay of {@link DELAY}ms.
 *
 * Supported components:
 * <ul>
 *     <li>{@link SkeletonProps}</li>
 *     <li>{@link LoadingOverlayProps}</li>
 * </ul>
 */
export function Delayed<ComponentProps extends DelayedComponentProps>(props: DelayedProps<ComponentProps>): JSX.Element {
	const {component: DelayedComponent, ...componentProps} = props;

	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setVisible(true), DELAY);
		return (): void => {
			clearTimeout(timer);
		};
	}, [componentProps]);

	if (visible) {
		return <DelayedComponent {...componentProps}/>;
	}
	return <></>;
}
