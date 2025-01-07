import {Button, Card, Grid, Group, Image, Paper, Text, Title} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarDay, faHourglassEnd} from '@fortawesome/free-solid-svg-icons';
import {JSX, RefObject} from 'react';
import {T} from '../../../components/T';
import {EventDetail} from '../EventFetcher';
import classes from './EventDetailsHeader.module.css';
import {EventDescription} from './EventDescription';
import {EventDetailsButtons} from './EventDetailsButtons';

type EventDetailsHeaderProps = EventDetail & {
	descriptionRef: RefObject<HTMLButtonElement>;
	scrollToDescription: () => void;
};

export function EventDetailsHeader(props: Readonly<EventDetailsHeaderProps>): JSX.Element {
	const {event, eventDate, descriptionRef, scrollToDescription} = props;

	return (
		<>
			<Grid gutter={'lg'}>
				<Grid.Col span={{base: 12, sm: 4}}>
					<Paper shadow={'md'}>
						<Image src={event.pictureUrl} radius={'sm'}/>
					</Paper>
				</Grid.Col>
				<Grid.Col span={{base: 12, sm: 8}}>
					<Group justify={'space-between'} wrap={'nowrap'}>
						<Title order={1} className={classes.forceWrap}>{event.name}</Title>
						<EventDetailsButtons eventId={event.id} ownerGuildIdentifier={event.ownerGuildIdentifier}/>
					</Group>
					<Group gap={'xs'}>
						<Group gap={'xs'} wrap={'nowrap'}>
							<Text><FontAwesomeIcon icon={faCalendarDay}/></Text>
							<Text size={'xl'}>{eventDate.format('L LT')} <T k={'oClock'}/></Text>
						</Group>
						{event.missionLength &&
                            <Group gap={'xs'} wrap={'nowrap'} maw={'100%'}>
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
