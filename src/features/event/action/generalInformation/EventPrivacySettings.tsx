import {RequiredInformationProps} from './RequiredInformation';
import {IconSwitch} from '../../../../components/Button/IconSwitch';
import {faEye, faEyeSlash, faUserNinja, faUsers, faUsersSlash} from '@fortawesome/free-solid-svg-icons';
import {ElementWithInfo} from '../../../../components/Text/ElementWithInfo';
import {Stack} from '@mantine/core';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {useChangeWatcher} from '../useEventUpdate';

export function EventPrivacySettings(props: RequiredInformationProps): JSX.Element {
	const {canRevokeShareable = true} = props;
	const form = useFormContext();

	useChangeWatcher('shareable');
	useChangeWatcher('hidden');

	const shareableInputProps = form.getInputProps('shareable', {type: 'checkbox'});
	const hiddenInputProps = form.getInputProps('hidden', {type: 'checkbox'});
	return <Stack align={'flex-start'} spacing={'xs'}>
		<IconSwitch onIcon={faUsers} offIcon={faUsersSlash}
					label={<ElementWithInfo text={'Teilen erlauben'}
											tooltip={'Ermöglicht es anderen Gruppen diese Event in ihren Kalender einzufügen und darüber Teilnehmer einzutragen.'}/>}
					disabled={!canRevokeShareable}
					title={!canRevokeShareable ? 'Wurde bereits von einer anderen Community hinzugefügt.' : undefined}
					{...shareableInputProps}/>

		<IconSwitch onIcon={Math.random() < 0.9 ? faEyeSlash : faUserNinja} offIcon={faEye}
					label={<ElementWithInfo text={'Versteckt'}
											tooltip={'Berechtigt alle Interessierten das Event im Kalender zu sehen.'}/>}
					{...hiddenInputProps}/>
	</Stack>;
}
