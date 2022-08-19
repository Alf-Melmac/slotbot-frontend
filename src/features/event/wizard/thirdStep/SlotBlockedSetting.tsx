import {ActionIcon, Group, Input, TextInput} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLock, faLockOpen} from '@fortawesome/free-solid-svg-icons';
import {TEXT} from '../../../../utils/maxLength';
import {flexGrow} from '../../../../contexts/CommonStylings';
import {EventWizardStepProps} from '../EventWizard';
import {SlotListEntrySettingsProps} from './SlotListEntrySettings';
import {getFormFieldValue} from '../../../../utils/formHelper';

type SlotBlockedSettingProps = {
	form: EventWizardStepProps['form'];
	path: SlotListEntrySettingsProps['path'];
	index: SlotListEntrySettingsProps['index'];
};

export function SlotBlockedSetting(props: SlotBlockedSettingProps): JSX.Element {
	const {form, path, index} = props;
	const blocked = getFormFieldValue(form, `${path}.${index}.blocked`);

	return (
		<Input.Wrapper label={'Blockierung'}
					   description={'Niemand kann sich für diesen Platz anmelden. Optional kann ein Ersatztext angezeigt werden.'}
					   mt={'sm'}>
			<Group spacing={'xs'} mt={6}>
				<ActionIcon variant={'transparent'} size={'lg'}
							onClick={() => form.setFieldValue(`${path}.${index}.blocked`, !blocked)}>
					<FontAwesomeIcon icon={blocked ? faLock : faLockOpen} size={'lg'}/>
				</ActionIcon>
				{blocked &&
                    <TextInput placeholder={'Ersatztext'} maxLength={TEXT} required styles={{root: flexGrow}}
							   {...form.getInputProps(`${path}.${index}.replacementText`)}/>
				}
			</Group>
		</Input.Wrapper>
	);
}
