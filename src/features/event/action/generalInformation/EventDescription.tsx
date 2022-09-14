import {EventAction, EventActionPageProps} from '../EventActionPage';
import {EMBEDDABLE_DESCRIPTION} from '../../../../utils/maxLength';
import {EventActionTextarea} from '../EventActionTextarea';

export function EventDescription<FormReturnType extends EventAction>(props: EventActionPageProps<FormReturnType>): JSX.Element {
    return <EventActionTextarea {...props} inputProps={{
        label: 'Beschreibung',
        placeholder: 'Beschreibung',
        autosize: true,
        minRows: 3,
        maxLength: EMBEDDABLE_DESCRIPTION,
    }} formPath={'description'}/>;
}
