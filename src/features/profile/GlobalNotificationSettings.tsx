import {ElementWithInfo, YPosition} from '../../components/Text/ElementWithInfo';
import {ActionIcon, Group, NumberInput, Switch, Text, Title} from '@mantine/core';
import {UserOwnProfileDto} from './profileTypes';
import {isEmpty} from 'lodash';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {handleGrammaticalNumber} from '../../utils/textHelper';
import {useForm} from '@mantine/form';
import {AddButton} from '../../components/Form/AddButton';
import slotbotServerClient from '../../hooks/slotbotServerClient';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {showNotification} from '@mantine/notifications';
import {ButtonWithDisabledTooltip} from '../../components/Form/ButtonWithDisabledTooltip';

type GlobalNotificationSettingsProps = {
	notificationSettings: UserOwnProfileDto['notificationSettings'];
};

export function GlobalNotificationSettings(props: GlobalNotificationSettingsProps): JSX.Element {
	const form = useForm({
		initialValues: {
			notificationsActive: !isEmpty(props.notificationSettings),
			notificationSettings: props.notificationSettings,
		},
	});

	const queryClient = useQueryClient();
	const postSteamId = () => slotbotServerClient.put('/notifications/own', form.values.notificationSettings).then((res) => res.data);
	const {mutate} = useMutation<UserOwnProfileDto['notificationSettings'], AxiosError>(postSteamId, {
		onSuccess: (data) => {
			showNotification({
				title: 'Gespeichert',
				message: `${data.length} Benachrichtigungen vorgemerkt`,
				color: 'green',
			});
			queryClient.setQueryData(['ownProfile'], data);
		},
		onError: error => {
			showNotification({
				title: `Speichern fehlgeschlagen. (${error.code})`,
				message: error.message,
				color: 'red',
			});
		},
	});

	return (
		<>
			<Title order={3}>
				<ElementWithInfo text={'Globale Benachrichtigungseinstellungen'}
								 tooltip={'Hier können Benachrichtigungen vor einem Event konfiguriert werden. Benachrichtigungen erhältst du in Form einer Discord-Privatnachricht.'}
								 multiline tooltipWidth={300} tooltipPosition={'right'}/>
			</Title>

			<Switch
				label={'Benachrichtigungen aktivieren'} {...form.getInputProps('notificationsActive', {type: 'checkbox'})}/>
			{form.values.notificationsActive &&
                <>
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
                        <ElementWithInfo text={<ButtonWithDisabledTooltip color={'green'} onClick={() => mutate()}
																		  disabled={!form.isDirty()}
																		  tooltip={'Keine Änderungen'}>
							Benachrichtigungen Speichern</ButtonWithDisabledTooltip>}
                                         tooltip={'Anpassungen an den globalen Einstellungen werden nur für Slottungen nach dem Speichern übernommen.'}
                                         iconPosition={YPosition.LEFT} multiline tooltipWidth={250}
                                         tooltipPosition={'left'}/>
                    </Group>
                </>
			}
		</>
	);
}
