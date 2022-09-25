import {ElementWithInfo, YPosition} from '../../components/Text/ElementWithInfo';
import {ActionIcon, Group, NumberInput, Text, Title} from '@mantine/core';
import {UserOwnProfileDto} from './profileTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {handleGrammaticalNumber} from '../../utils/textHelper';
import {useForm} from '@mantine/form';
import {AddButton} from '../../components/Button/AddButton';
import slotbotServerClient from '../../hooks/slotbotServerClient';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {showNotification} from '@mantine/notifications';
import {ButtonWithDisabledTooltip} from '../../components/Button/ButtonWithDisabledTooltip';
import {useEffect, useState} from 'react';
import {isEmpty, isEqual} from 'lodash';

type GlobalNotificationSettingsProps = {
	notificationSettings: UserOwnProfileDto['notificationSettings'];
};

export function GlobalNotificationSettings(props: GlobalNotificationSettingsProps): JSX.Element {
	const form = useForm<GlobalNotificationSettingsProps>({
		initialValues: {
			notificationSettings: props.notificationSettings,
		},
	});

	const [existInitialSettings, setExistInitialSettings] = useState(false);
	useEffect(() => {
		setExistInitialSettings(!isEmpty(props.notificationSettings));
	}, []);

	useEffect(() => {
		form.setDirty({notificationSettings: !isEqual(props.notificationSettings, form.values.notificationSettings)});
	}, [form.values]);

	const [saving, setSaving] = useState(false);

	const queryClient = useQueryClient();
	const postNotificationSettings = () => slotbotServerClient.put('/notifications/own', form.values.notificationSettings).then((res) => res.data);
	const {mutate} = useMutation<UserOwnProfileDto['notificationSettings'], AxiosError>(postNotificationSettings, {
		onMutate: () => {
			setSaving(true);
		},
		onSuccess: (data) => {
			const noOfNotifications = data.length;
			showNotification({
				title: 'Gespeichert',
				message: noOfNotifications === 0 ? 'Benachrichtigungen deaktiviert.' : `${handleGrammaticalNumber(noOfNotifications, 'Benachrichtigung', 'Benachrichtigungen')} vorgemerkt.`,
				color: 'green',
			});
			queryClient.setQueryData(['ownProfile'], data);
			form.resetDirty(); //This doesn't update the initialValues where dirty checks against. But we don't expect many manual rollbacks by the user, therefore this behavior is acceptable here
			setExistInitialSettings(!isEmpty(data));
		},
		onError: (error) => {
			showNotification({
				title: `Speichern fehlgeschlagen. (${error.code})`,
				message: error.message,
				color: 'red',
			});
		},
		onSettled: () => {
			setSaving(false);
		},
	});

	return (
		<>
			<Title order={3}>
				<ElementWithInfo text={'Globale Benachrichtigungseinstellungen'}
								 tooltip={'Hier können Benachrichtigungen vor einem Event konfiguriert werden. Benachrichtigungen erhältst du in Form einer Discord-Privatnachricht.'}
								 multiline tooltipWidth={300} tooltipPosition={'right'}/>
			</Title>

			{form.values.notificationSettings.map((_item, index) =>
				<Group key={index}>
					<ActionIcon onClick={() => form.removeListItem('notificationSettings', index)}>
						<FontAwesomeIcon icon={faTrashCan}/>
					</ActionIcon>
					<NumberInput {...form.getInputProps(`notificationSettings.${index}.hoursBeforeEvent`)}
								 min={0}
								 parser={value => value?.replace(/\s?Stunden?/g, '')}
								 formatter={value => {
									 const number = parseInt(value || '0');
									 return !Number.isNaN(number) ?
										 handleGrammaticalNumber(number, 'Stunde', 'Stunden')
										 : '0 Stunden';
								 }}/>
					<NumberInput {...form.getInputProps(`notificationSettings.${index}.minutesBeforeEvent`)}
								 min={0}
								 parser={value => value?.replace(/\s?Minuten?/g, '')}
								 formatter={value => {
									 const number = parseInt(value || '0');
									 return !Number.isNaN(number) ?
										 handleGrammaticalNumber(number, 'Minute', 'Minuten')
										 : '0 Minuten';
								 }}/>
					<Text>vor dem Event</Text>
				</Group>,
			)}
			<Group position={'apart'}>
				<AddButton label={'Benachrichtigung hinzufügen'}
						   onClick={() => form.insertListItem('notificationSettings', {
							   hoursBeforeEvent: 0,
							   minutesBeforeEvent: 0,
						   })}/>
				{(existInitialSettings || form.isDirty()) &&
                    <ElementWithInfo text={
						<ButtonWithDisabledTooltip color={'green'} onClick={() => mutate()}
												   disabled={!form.isDirty()} tooltip={'Keine Änderungen'}
												   loading={saving}>
							Benachrichtigungen Speichern</ButtonWithDisabledTooltip>}
                                     tooltip={'Anpassungen an den globalen Einstellungen werden nur für Slottungen nach dem Speichern übernommen.'}
                                     iconPosition={YPosition.LEFT} multiline tooltipWidth={250}
                                     tooltipPosition={'left'}/>
				}
			</Group>
		</>
	);
}
