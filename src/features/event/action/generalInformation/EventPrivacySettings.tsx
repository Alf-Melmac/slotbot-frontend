import {EventAction} from '../EventActionPage';
import {RequiredInformationProps} from './RequiredInformation';
import {IconSwitch} from '../../../../components/Form/IconSwitch';
import {faEye, faEyeSlash, faUsers, faUsersSlash} from '@fortawesome/free-solid-svg-icons';
import {ElementWithInfo} from '../../../../components/Text/ElementWithInfo';

export function EventPrivacySettings<FormReturnType extends EventAction>(props: RequiredInformationProps<FormReturnType>): JSX.Element {
    const {form, canRevokeShareable = true} = props;

    return <>
        <IconSwitch onIcon={faUsers} offIcon={faUsersSlash}
                    label={<ElementWithInfo text={'Teilen erlauben'}
                                            tooltip={'Ermöglicht es anderen Gruppen diese Event in ihren Kalender einzufügen und darüber Teilnehmer einzutragen.'}/>}
                    disabled={!canRevokeShareable} title={!canRevokeShareable ? 'Wurde bereits von einer anderen Community hinzugefügt.' : undefined}
                    {...form.getInputProps('shareable', {type: 'checkbox'})}/>

        <IconSwitch onIcon={faEye} offIcon={faEyeSlash}
                    label={<ElementWithInfo text={'Sichtbarkeit'}
                                            tooltip={'Berechtigt alle Interessierten das Event im Kalender zu sehen.'}/>}
                    {...form.getInputProps('hidden', {type: 'checkbox'})}/>
    </>;
}
