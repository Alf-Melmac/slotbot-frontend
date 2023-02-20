import {ElementWithInfo, YPosition} from '../../components/Text/ElementWithInfo';
import {ActionIcon, Group, NumberInput, Text, Title} from '@mantine/core';
import {UserOwnProfileDto} from './profileTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {useForm} from '@mantine/form';
import {AddButton} from '../../components/Button/AddButton';
import slotbotServerClient from '../../hooks/slotbotServerClient';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {ButtonWithDisabledTooltip} from '../../components/Button/ButtonWithDisabledTooltip';
import {useEffect, useState} from 'react';
import {isEmpty, isEqual} from 'lodash';
import {errorNotification, successNotification} from '../../utils/notificationHelper';
import {T} from '../../components/T';
import {useLanguage} from '../../contexts/language/Language';
import {TranslationOptions} from '../../contexts/language/TranslationTypes';

type GlobalNotificationSettingsProps = Pick<UserOwnProfileDto, 'notificationSettings'>;

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
			successNotification(noOfNotifications === 0
				? <T k={'notifications.disabled'}/>
				: <T k={'notifications.enabled'} count={noOfNotifications} countAsArgs/>);
			queryClient.setQueryData(['ownProfile'], data);
			form.resetDirty(); //This doesn't update the initialValues where dirty checks against. But we don't expect many manual rollbacks by the user, therefore this behavior is acceptable here
			setExistInitialSettings(!isEmpty(data));
		},
		onError: errorNotification,
		onSettled: () => {
			setSaving(false);
		},
	});

	const {t} = useLanguage();
	return (
		<>
			<Title order={3}>
				<ElementWithInfo text={<T k={'profile.notifications.title'}/>}
								 tooltip={<T k={'profile.notifications.tooltip'}/>}
								 multiline tooltipWidth={300} tooltipPosition={'right'}/>
			</Title>

			{form.values.notificationSettings.map((_item, index) =>
				<Group key={index}>
					<ActionIcon onClick={() => form.removeListItem('notificationSettings', index)}>
						<FontAwesomeIcon icon={faTrashCan}/>
					</ActionIcon>
					<NumberInput {...form.getInputProps(`notificationSettings.${index}.hoursBeforeEvent`)}
								 min={0}
								 parser={value => value?.replace(new RegExp(t('regex.hours'), 'g'), '')}
								 formatter={value => t('hour', getOptions(value))}/>
					<NumberInput {...form.getInputProps(`notificationSettings.${index}.minutesBeforeEvent`)}
								 min={0}
								 parser={value => value?.replace(new RegExp(t('regex.hours'), 'g'), '')}
								 formatter={value => t('minute', getOptions(value))}/>
					<Text><T k={'notifications.input.suffix'}/></Text>
				</Group>,
			)}
			<Group position={'apart'}>
				<AddButton label={'notifications.add'}
						   onClick={() => form.insertListItem('notificationSettings', {
							   hoursBeforeEvent: 0,
							   minutesBeforeEvent: 0,
						   })}/>
				{(existInitialSettings || form.isDirty()) &&
                    <ElementWithInfo
                        text={<ButtonWithDisabledTooltip color={'green'} onClick={() => mutate()}
														 disabled={!form.isDirty()} tooltip={'noChanges'}
														 loading={saving}>
							<T k={'notifications.save'}/></ButtonWithDisabledTooltip>
						}
                        tooltip={<T k={'profile.notifications.save.tooltip'}/>}
                        iconPosition={YPosition.LEFT} multiline tooltipWidth={250} tooltipPosition={'left'}/>
				}
			</Group>
		</>
	);
}

/**
 * getRelativeTimeInputFormatterTranslationOptions
 */
function getOptions(value: string | undefined): TranslationOptions {
	return {count: parseInt(value || '0'), countAsArgs: true};
}
