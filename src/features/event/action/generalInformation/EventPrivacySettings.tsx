import {EventAction} from '../EventActionPage';
import {RequiredInformationProps} from './RequiredInformation';
import {IconSwitch} from '../../../../components/Form/IconSwitch';
import {faEye, faEyeSlash, faUserNinja, faUsers, faUsersSlash} from '@fortawesome/free-solid-svg-icons';
import {ElementWithInfo} from '../../../../components/Text/ElementWithInfo';
import {changeHandler} from '../../../../utils/formHelper';
import {Stack} from '@mantine/core';

export function EventPrivacySettings<FormReturnType extends EventAction>(props: RequiredInformationProps<FormReturnType>): JSX.Element {
	const {form, canRevokeShareable = true, editMode} = props;

	const shareableInputProps = form.getInputProps('shareable', {type: 'checkbox'});
	const hiddenInputProps = form.getInputProps('hidden', {type: 'checkbox'});
	return <Stack align={'flex-start'} spacing={'xs'}>
		<IconSwitch onIcon={faUsers} offIcon={faUsersSlash}
					label={<ElementWithInfo text={'Teilen erlauben'}
											tooltip={'Ermöglicht es anderen Gruppen diese Event in ihren Kalender einzufügen und darüber Teilnehmer einzutragen.'}/>}
					disabled={!canRevokeShareable}
					title={!canRevokeShareable ? 'Wurde bereits von einer anderen Community hinzugefügt.' : undefined}
					{...shareableInputProps}
			//TODO mutate
					onChange={changeHandler(shareableInputProps, editMode, () => console.log(form.values.shareable))}/>

		<IconSwitch onIcon={Math.random() < 0.9 ? faEyeSlash : faUserNinja} offIcon={faEye}
					label={<ElementWithInfo text={'Versteckt'}
											tooltip={'Berechtigt alle Interessierten das Event im Kalender zu sehen.'}/>}
					{...hiddenInputProps}
			//TODO mutate
					onChange={changeHandler(hiddenInputProps, editMode, () => console.log(form.values.hidden))}/>
	</Stack>;
}
