import {JSX, useEffect, useRef, useState} from 'react';
import {PaperProps} from '@mantine/core';
import {DELAY} from './Delayed';

type DelayedComponentProps = PaperProps;
type DelayedVisibleProps<ComponentProps extends DelayedComponentProps> = ComponentProps & {
	component: any;
};

/**
 * Shows children after a delay of {@link DELAY}ms. Uses styles to hide the component instead of not rendering it.
 *
 * Supported components:
 * <ul>
 *     <li>{@link PaperProps}</li>
 * </ul>
 * @see Delayed
 */
export function DelayedVisible<ComponentProps extends DelayedComponentProps>(props: Readonly<DelayedVisibleProps<ComponentProps>>): JSX.Element {
	const {component: DelayedComponent, ...componentProps} = props;

	const eventCalendarWrapper = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		eventCalendarWrapper.current?.style.setProperty('display', visible ? 'inherit' : 'none');
	}, [visible, eventCalendarWrapper]);

	useEffect(() => {
		const timer = setTimeout(() => setVisible(true), DELAY);
		return (): void => {
			clearTimeout(timer);
		};
	}, [componentProps]);

	return <DelayedComponent ref={eventCalendarWrapper} {...componentProps}/>;
}
