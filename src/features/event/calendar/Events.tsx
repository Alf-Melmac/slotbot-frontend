import {Nav} from "../../../components/nav/Nav";
import {Box, Center, Container, createStyles, Title} from "@mantine/core";
import {LoadingCalendar} from './LoadingCalendar';
import {EventCalendar} from './EventCalendar';
import {useCallback, useRef, useState} from 'react';
import {T} from '../../../components/T';
import {useTranslatedDocumentTitle} from '../../../hooks/useTranslatedDocumentTitle';

const useStyles = createStyles(() => ({
	hidden: {
		display: 'none',
	},
}));

export function Events(): JSX.Element {
	useTranslatedDocumentTitle('documentTitle.events');
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

	const [animated, setAnimated] = useState(true);

	return (
		<Nav>
			<Container>
				<Center>
					<Title><T k={'events'}/></Title>
				</Center>

				<Box ref={loadingCalendarWrapper}>
					<LoadingCalendar animated={animated}/>
				</Box>
				<Box ref={eventCalendarWrapper}>
					<EventCalendar toggleVisible={toggleVisible} onFailure={() => setAnimated(false)}/>
				</Box>
			</Container>
		</Nav>
	);
}
