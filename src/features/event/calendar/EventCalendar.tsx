import FullCalendar, {EventContentArg} from '@fullcalendar/react';
import de from '@fullcalendar/core/locales/de';
import dayGridPlugin from '@fullcalendar/daygrid';
import {Box, ColorSwatch, createStyles, Text, Tooltip} from '@mantine/core';
import {showNotification} from '@mantine/notifications';
import {Bold} from '../../../components/Text/Bold';
import {AnchorLink} from '../../../components/Text/AnchorLink';
import {EventTooltip} from './EventTooltip';
import {useCheckAccess} from '../../../contexts/authentication/useCheckAccess';
import {ApplicationRoles} from '../../../contexts/authentication/authenticationTypes';
import {AddButton} from '../../../components/Button/AddButton';
import {getBackendUrl} from '../../../utils/urlHelper';

const useStyles = createStyles(() => ({
	eventType: {
		minWidth: 11,
	},

	eventWrapper: {
		all: 'inherit',
	},

	eventLink: {
		display: 'inherit',
		alignItems: 'inherit',
		textDecoration: 'none !important',
		overflow: 'hidden',
	},
}));

type EventCalendarProps = {
	toggleVisible: (isLoading: boolean) => void;
	onFailure: () => void;
};

export function EventCalendar(props: EventCalendarProps): JSX.Element {
	const {toggleVisible, onFailure} = props;
	const {classes} = useStyles();

	const eventContent = (arg: EventContentArg) => {
		const {event, backgroundColor} = arg;

		return (
			<AnchorLink to={`/events/${event.id}`} className={classes.eventLink}>
				<Tooltip label={<EventTooltip eventName={event.title} {...event.extendedProps.shortInformation}/>}>
					<Box className={classes.eventWrapper}>
						<ColorSwatch color={backgroundColor} className={classes.eventType} size={11} mx={2}/>
						<Text>{arg.timeText} <Bold>{event.title}</Bold></Text>
					</Box>
				</Tooltip>
			</AnchorLink>
		);
	};

	const eventManager = useCheckAccess(ApplicationRoles.ROLE_EVENT_MANAGE);

	return (
		<>
			{eventManager &&
                <AddButton label={'Neues Event anlegen'} to={'new'} mb={'sm'}/>
			}
			<FullCalendar
				plugins={[dayGridPlugin]}
				initialView="dayGridMonth"
				locale={de}
				viewDidMount={(_arg) => toggleVisible(true)}
				eventSources={[
					{
						url: `${getBackendUrl()}/events/list`,
						color: 'blue',
					},
				]}
				eventContent={eventContent}
				eventSourceSuccess={(_content, _xhr) => toggleVisible(false)}
				eventSourceFailure={(error) => {
					showNotification({
						title: 'Oops',
						message: error.message,
						color: 'red',
						autoClose: false,
					});
					onFailure();
				}}
			/>
		</>
	);
}
