import {EventDetailsDto} from '../../eventTypes';
import {Alert, Box, Card, Center, Group, Text} from '@mantine/core';
import {ReservedFor} from './ReservedFor';
import {EventDetailsSlotlistProvider} from '../../../../contexts/event/details/slotlist/EventDetailsSlotlistContext';
import {Fragment, JSX} from 'react';
import {Slots} from './Slots';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPuzzlePiece} from '@fortawesome/free-solid-svg-icons';
import {Requirements} from '../../../requirements/Requirements';
import classes from './EventSlotlist.module.css';
import {T} from '../../../../components/T';
import {Required} from './requirements/Required';

export type EventSlotlistProps = Pick<EventDetailsDto, 'id' | 'squadList' | 'requirements'>;

/**
 * Displays the slotlist inside the event details
 */
export function EventSlotlist({id, squadList, requirements}: Readonly<EventSlotlistProps>): JSX.Element {
	return <>
		{requirements.length > 0 &&
            <Alert variant={'outline'} color={'violet'} title={'Für alle Plätze gelten die folgenden Voraussetzungen'}
                   icon={<FontAwesomeIcon icon={faPuzzlePiece}/>} mb={'md'}>
                <Box className={classes.requirementsContainer}>
					{requirements.map((requirementList) => <Fragment key={requirementList.id}>
						{requirementList.name}
						<Requirements requirements={requirementList.requirements}/>
					</Fragment>)}
                </Box>
            </Alert>
		}

		{squadList.length === 0 && <Center><Text><T k={'slotlist.empty'}/></Text></Center>}

		<EventDetailsSlotlistProvider eventId={id}>
			{squadList.map((squad) => (
				<Card mb={'md'} key={squad.id}>
					<Group wrap={'nowrap'} gap={1}>
						<Text>{squad.name}</Text>
						<ReservedFor guild={squad.reservedFor}/>
						<Required itemBefore={!!squad.reservedFor} requirementList={squad.requirements}/>
					</Group>

					<Slots slots={squad.slotList}/>
				</Card>
			))}
		</EventDetailsSlotlistProvider>
	</>;
}
