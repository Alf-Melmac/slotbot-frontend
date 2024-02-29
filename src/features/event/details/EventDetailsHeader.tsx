import {Button, Card, Grid, Group, Image, Paper, Text, TextProps, Title} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarDay, faHourglassEnd} from '@fortawesome/free-solid-svg-icons';
import {EventDetailsDto} from '../eventTypes';
import {JSX, MutableRefObject} from 'react';
import {EventCopy} from './EventCopy';
import {EventEditButton} from './EventEditButton';
import {T} from '../../../components/T';
import {EventDetail} from '../EventFetcher';
import classes from './EventDetailsHeader.module.css';
import cx from 'clsx';

type EventDetailsHeaderProps = EventDetail & {
	descriptionRef: MutableRefObject<HTMLButtonElement>;
	scrollToDescription: () => void;
};

export function EventDetailsHeader(props: Readonly<EventDetailsHeaderProps>): JSX.Element {
	const {event, eventDate, descriptionRef, scrollToDescription} = props;

	return (
		<>
			<Grid gutter={'xl'} mt={1}>
				<Grid.Col span={{base: 12, sm: 4}}>
					<Paper shadow={'md'}>
						<Image src={event.pictureUrl} radius={'sm'}
							//withPlaceholder TODO m7-8
						/>
					</Paper>
				</Grid.Col>
				<Grid.Col span={{base: 12, sm: 8}}>
					<Group gap={'apart'} wrap={'nowrap'}>
						<Title order={1} className={classes.forceWrap}>{event.name}</Title>
						<Group gap={'xs'}>
							<EventCopy eventId={event.id}/>
							<EventEditButton eventId={event.id}/>
						</Group>
					</Group>
					<Group gap={'xs'}>
						<Group gap={'xs'} wrap={'nowrap'}>
							<Text><FontAwesomeIcon icon={faCalendarDay}/></Text>
							<Text size={'xl'}>{eventDate.format('L LT')} <T k={'oClock'}/></Text>
						</Group>
						{event.missionLength &&
                            <Group gap={'xs'} wrap={'nowrap'}>
                                <Text><FontAwesomeIcon icon={faHourglassEnd}/></Text>
                                <Text size={'xl'} className={classes.forceWrap}>{event.missionLength}</Text>
                            </Group>
						}
					</Group>
					{
						event.descriptionAsHtml &&
                        <Card mt={'sm'}>
                            <EventDescription hiddenFrom={'md'} description={event.descriptionAsHtml} lineClamp={1}/>
                            <EventDescription visibleFrom={'md'} description={event.descriptionAsHtml} lineClamp={4}/>
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

type EventDescriptionProps = Pick<TextProps, 'className' | 'lineClamp' | 'visibleFrom' | 'hiddenFrom'> & {
	description: EventDetailsDto['descriptionAsHtml'];
}

function EventDescription(props: Readonly<EventDescriptionProps>): JSX.Element {
	return <Text lineClamp={props.lineClamp}
				 dangerouslySetInnerHTML={{__html: props.description}}
				 className={cx(classes.forceWrap, props.className)}/>;
}
