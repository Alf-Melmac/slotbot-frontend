import {Button, Card, Grid, Group, Image, MediaQuery, Paper, Text, TextProps, Title} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarDay, faHourglassEnd} from '@fortawesome/free-solid-svg-icons';
import {EventDetailsDto} from '../eventTypes';
import dayjs from 'dayjs';
import {MutableRefObject} from 'react';

type EventDetailsHeaderProps = {
	event: EventDetailsDto;
	eventDate: dayjs.Dayjs;
	descriptionRef: MutableRefObject<HTMLButtonElement>;
	scrollToDescription: () => void;
};

export function EventDetailsHeader(props: EventDetailsHeaderProps): JSX.Element {
	const {event, eventDate, descriptionRef, scrollToDescription} = props;

	return (
		<>
			<Grid gutter={'xl'} mt={1}>
				<Grid.Col xs={4} span={12}>
					<Paper shadow={'md'}>
						<Image src={event.pictureUrl} radius={'sm'} withPlaceholder/>
					</Paper>
				</Grid.Col>
				<Grid.Col xs={8} span={12}>
					<Title order={1}>{event.name}</Title>
					<Group spacing={'xs'}>
						<Text><FontAwesomeIcon icon={faCalendarDay}/></Text>
						<Text size={'xl'}>{eventDate.format('L LT')} Uhr</Text>
						{event.missionLength &&
                            <>
                                <Text><FontAwesomeIcon icon={faHourglassEnd}/></Text>
                                <Text size={'xl'}>{event.missionLength}</Text>
                            </>
						}
					</Group>
					{
						event.descriptionAsHtml &&
                        <Card mt={'sm'}>
                            <MediaQuery largerThan={'md'} styles={{display: 'none'}}>
                                <EventDescription description={event.descriptionAsHtml} lineClamp={1}/>
                            </MediaQuery>
                            <MediaQuery smallerThan={'md'} styles={{display: 'none'}}>
                                <EventDescription description={event.descriptionAsHtml} lineClamp={4}/>
                            </MediaQuery>
                            <Button variant={'default'} mt={'sm'}
                                    onClick={() => {
										descriptionRef.current?.click();
										scrollToDescription();
									}}>Beschreibung anzeigen</Button>
                        </Card>
					}

				</Grid.Col>
			</Grid>

			<Text size={'xs'} mt={4}>Mission von <em>{event.creator}</em></Text>
		</>
	);
}

type EventDescriptionProps = {
	description: EventDetailsDto['descriptionAsHtml'];
	lineClamp: TextProps['lineClamp'];
}

function EventDescription(props: EventDescriptionProps): JSX.Element {
	return <Text lineClamp={props.lineClamp} dangerouslySetInnerHTML={{__html: props.description}}/>;
}
