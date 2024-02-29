import {RequiredInformationProps} from './RequiredInformation';
import {IconSwitch} from '../../../../components/Button/IconSwitch';
import {faEye, faEyeSlash, faUserNinja, faUsers, faUsersSlash} from '@fortawesome/free-solid-svg-icons';
import {ElementWithInfo} from '../../../../components/Text/ElementWithInfo';
import {Stack} from '@mantine/core';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {useChangeWatcher} from '../useEventUpdate';
import {T} from '../../../../components/T';
import {JSX} from 'react';

export function EventPrivacySettings(props: Readonly<RequiredInformationProps>): JSX.Element {
	const {canRevokeShareable = true} = props;
	const form = useFormContext();

	useChangeWatcher('shareable');
	useChangeWatcher('hidden');

	return <Stack align={'flex-start'} gap={'xs'}>
		<IconSwitch onIcon={faUsers} offIcon={faUsersSlash}
					label={<ElementWithInfo text={<T k={'event.shareable'}/>}
											tooltip={<T k={'event.shareable.tooltip'}/>}/>}
					disabled={!canRevokeShareable}
					title={!canRevokeShareable ? <T k={'event.shareable.noLongerPossible'}/> : undefined}
					{...form.getInputProps('shareable', {type: 'checkbox'})}/>

		<IconSwitch onIcon={Math.random() < 0.9 ? faEyeSlash : faUserNinja} offIcon={faEye}
					label={<ElementWithInfo text={<T k={'event.hidden'}/>}
											tooltip={<T k={'event.hidden.tooltip'}/>}/>}
					{...form.getInputProps('hidden', {type: 'checkbox'})}/>
	</Stack>;
}
