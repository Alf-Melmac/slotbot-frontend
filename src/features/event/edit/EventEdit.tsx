import {useParams} from 'react-router-dom';
import {EventPageParams} from '../EventRoutes';

export function EventEdit(): JSX.Element {
    const {eventId} = useParams<EventPageParams>();
    if (!eventId) throw Error('Invalid state: Event id required');

    return (
        <>
            {eventId}
        </>
    );
}
