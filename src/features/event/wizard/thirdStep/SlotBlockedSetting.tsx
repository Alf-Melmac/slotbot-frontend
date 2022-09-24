import {ActionIcon, Group, Input, TextInput} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLock, faLockOpen} from '@fortawesome/free-solid-svg-icons';
import {TEXT} from '../../../../utils/maxLength';
import {flexGrow} from '../../../../contexts/CommonStylings';
import {SlotListEntrySettingsProps} from './SlotListEntrySettings';
import {getFormFieldValue} from '../../../../utils/formHelper';
import {EventAction} from '../../action/EventActionPage';

type SlotBlockedSettingProps<FormReturnType extends EventAction> = {
	form: SlotListEntrySettingsProps<FormReturnType>['form'];
	path: SlotListEntrySettingsProps<FormReturnType>['path'];
	index: SlotListEntrySettingsProps<FormReturnType>['index'];
};

export function SlotBlockedSetting<FormReturnType extends EventAction>(props: SlotBlockedSettingProps<FormReturnType>): JSX.Element {
	const {form, path, index} = props;
	const blocked = getFormFieldValue(form, `${path}.${index}.blocked`);

	return (
		<Input.Wrapper label={'Blockierung'}
					   description={'Niemand kann sich für diesen Platz anmelden. Optional kann ein Ersatztext angezeigt werden.'}
					   mt={'sm'}>
			<Group spacing={'xs'} mt={6}>
				<ActionIcon variant={'transparent'} size={'lg'}
					/*@ts-ignore blocked is always a boolean*/
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
