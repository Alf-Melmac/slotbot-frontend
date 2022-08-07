import {Box, createStyles} from "@mantine/core";
import {useCallback, useRef, useState} from 'react';
import {EventCalendar} from './EventCalendar';
import {LoadingCalendar} from './LoadingCalendar';

const useStyles = createStyles(() => ({
	hidden: {
		display: 'none',
	},
}));

export function EventCalendarPage(): JSX.Element {
	const {classes} = useStyles();

	const eventCalendarWrapper = useRef<HTMLDivElement>(null);
	const loadingCalendarWrapper = useRef<HTMLDivElement>(null);
	const toggleVisible = useCallback((isLoading: boolean) => {
		if (loadingCalendarWrapper.current) {
			loadingCalendarWrapper.current.classList.toggle(classes.hidden, !isLoading);
		}
		if (eventCalendarWrapper.current) {
			eventCalendarWrapper.current.classList.toggle(classes.hidden, isLoading);
		}
	}, [loadingCalendarWrapper, eventCalendarWrapper]);

	const [animated, setAnimated] = useState<boolean>(true);

	return (
		<>
			<Box ref={loadingCalendarWrapper}>
				<LoadingCalendar animated={animated}/>
			</Box>
			<Box ref={eventCalendarWrapper}>
				<EventCalendar toggleVisible={toggleVisible} onFailure={() => setAnimated(false)}/>
			</Box>
		</>
	);
}
