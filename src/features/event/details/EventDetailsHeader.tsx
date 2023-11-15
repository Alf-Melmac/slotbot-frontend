import {Button, Card, createStyles, Grid, Group, Image, MediaQuery, Paper, Text, TextProps, Title} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarDay, faHourglassEnd} from '@fortawesome/free-solid-svg-icons';
import {EventDetailsDto} from '../eventTypes';
import {JSX, MutableRefObject} from 'react';
import {EventCopy} from './EventCopy';
import {EventEditButton} from './EventEditButton';
import {T} from '../../../components/T';
import {EventDetail} from '../EventFetcher';
import {hidden} from '../../../contexts/CommonStylings';

const useStyles = createStyles(() => ({
	forceWrap: {
		maxWidth: '100%',
		overflowWrap: 'break-word',
	},
}));

type EventDetailsHeaderProps = EventDetail & {
	descriptionRef: MutableRefObject<HTMLButtonElement>;
	scrollToDescription: () => void;
};

export function EventDetailsHeader(props: Readonly<EventDetailsHeaderProps>): JSX.Element {
	const {event, eventDate, descriptionRef, scrollToDescription} = props;

	const {classes} = useStyles();
	return (
		<>
			<Grid gutter={'xl'} mt={1}>
				<Grid.Col xs={4} span={12}>
					<Paper shadow={'md'}>
						<Image src={event.pictureUrl} radius={'sm'} withPlaceholder/>
					</Paper>
				</Grid.Col>
				<Grid.Col xs={8} span={12}>
					<Group position={'apart'} noWrap>
						<Title order={1} className={classes.forceWrap}>{event.name}</Title>
						<Group spacing={'xs'}>
							<EventCopy eventId={event.id}/>
							<EventEditButton eventId={event.id}/>
						</Group>
					</Group>
					<Group spacing={'xs'}>
						<Text><FontAwesomeIcon icon={faCalendarDay}/></Text>
						<Text size={'xl'}>{eventDate.format('L LT')} <T k={'oClock'}/></Text>
						{event.missionLength &&
                            <>
                                <Text><FontAwesomeIcon icon={faHourglassEnd}/></Text>
                                <Text size={'xl'} className={classes.forceWrap}>{event.missionLength}</Text>
                            </>
						}
					</Group>
					{
						event.descriptionAsHtml &&
                        <Card mt={'sm'}>
                            <MediaQuery largerThan={'md'} styles={hidden}>
                                <EventDescription description={event.descriptionAsHtml} lineClamp={1}/>
                            </MediaQuery>
                            <MediaQuery smallerThan={'md'} styles={hidden}>
                                <EventDescription description={event.descriptionAsHtml} lineClamp={4}/>
                            </MediaQuery>
                            <Button variant={'default'} mt={'sm'}
                                    onClick={() => {
										descriptionRef.current?.click();
										scrollToDescription();
									}}><T k={'event.details.showDescription'}/></Button>
                        </Card>
					}

				</Grid.Col>
			</Grid>

			<Text size={'xs'} mt={4}><T k={'event.details.creator'}/> <em>{event.creator}</em></Text>
		</>
	);
}

type EventDescriptionProps = Pick<TextProps, 'className'> & {
	description: EventDetailsDto['descriptionAsHtml'];
	lineClamp: TextProps['lineClamp'];
}

function EventDescription(props: Readonly<EventDescriptionProps>): JSX.Element {
	const {classes, cx} = useStyles();
	return <Text lineClamp={props.lineClamp}
				 dangerouslySetInnerHTML={{__html: props.description}}
				 className={cx(classes.forceWrap, props.className)}/>;
}
