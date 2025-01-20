import {ActionIcon, Group, Input, TextInput} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLock, faLockOpen} from '@fortawesome/free-solid-svg-icons';
import {TEXT} from '../../../../utils/maxLength';
import {SlotListEntrySettingsProps} from './SlotListEntrySettings';
import {getFormFieldValue} from '../../../../utils/formHelper';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {T} from '../../../../components/T';
import {useLanguage} from '../../../../contexts/language/Language';
import {JSX} from 'react';

type SlotBlockedSettingProps = Pick<SlotListEntrySettingsProps, 'path' | 'index'>;

export function SlotBlockedSetting(props: Readonly<SlotBlockedSettingProps>): JSX.Element {
	const {path, index} = props;
	const {t} = useLanguage();
	const form = useFormContext();
	const blocked = getFormFieldValue(form, `${path}.${index}.blocked`);

	return (
		<Input.Wrapper label={<T k={'slotlistEntry.settings.blocked.label'}/>}
					   description={<T k={'slotlistEntry.settings.blocked.description'}/>}>
			<Group gap={'xs'} mt={6}>
				<ActionIcon color={'gray'} variant={'transparent'} size={'lg'}
					/*@ts-ignore blocked is always a boolean*/
							onClick={() => form.setFieldValue(`${path}.${index}.blocked`, !blocked)}>
					<FontAwesomeIcon icon={blocked ? faLock : faLockOpen} size={'lg'}/>
				</ActionIcon>
				{blocked &&
                    <TextInput placeholder={t('slotlistEntry.settings.blocked.placeholder')} maxLength={TEXT} required
                               flex={1} {...form.getInputProps(`${path}.${index}.replacementText`)}/>
				}
			</Group>
		</Input.Wrapper>
	);
}
