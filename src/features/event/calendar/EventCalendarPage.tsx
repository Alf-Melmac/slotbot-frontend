import {Box, createStyles} from "@mantine/core";
import {useCallback, useRef, useState} from 'react';
import {EventCalendar} from './EventCalendar';
import {LoadingCalendar} from './LoadingCalendar';

const useStyles = createStyles((theme) => ({
	hidden: {
		display: 'none',
	},
}));

type EventCalendarProps = {};

export function EventCalendarPage(props: EventCalendarProps): JSX.Element {
	const {} = props;
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
