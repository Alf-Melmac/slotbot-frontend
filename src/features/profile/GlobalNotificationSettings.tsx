import {ElementWithInfo, YPosition} from '../../components/Text/ElementWithInfo';
import {ActionIcon, Group, NumberInput, Text, Title} from '@mantine/core';
import {UserOwnProfileDto} from './profileTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {useForm, UseFormReturnType} from '@mantine/form';
import {AddButton} from '../../components/Button/AddButton';
import slotbotServerClient from '../../hooks/slotbotServerClient';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {ButtonWithDisabledTooltip} from '../../components/Button/ButtonWithDisabledTooltip';
import {errorNotification, successNotification} from '../../utils/notificationHelper';
import {T} from '../../components/T';
import {useLanguage} from '../../contexts/language/Language';
import {TranslationOptions} from '../../contexts/language/TranslationTypes';
import {JSX} from 'react';

type GlobalNotificationSettingsProps = Pick<UserOwnProfileDto, 'notificationSettings'>;

export function GlobalNotificationSettings(props: Readonly<GlobalNotificationSettingsProps>): JSX.Element {
	const form = useForm<GlobalNotificationSettingsProps>({
		mode: 'uncontrolled',
		initialValues: {
			notificationSettings: props.notificationSettings,
		},
	});

	const queryClient = useQueryClient();
	const postNotificationSettings = () => slotbotServerClient.put('/notifications/own', form.values.notificationSettings).then((res) => res.data);
	const {
		mutate,
		isPending,
	} = useMutation<UserOwnProfileDto['notificationSettings'], AxiosError>({
		mutationFn: postNotificationSettings,
		onSuccess: (data) => {
			const noOfNotifications = data.length;
			successNotification(noOfNotifications === 0
				? <T k={'notifications.disabled'}/>
				: <T k={'notifications.enabled'} count={noOfNotifications} countAsArgs/>);
			form.setValues({notificationSettings: data});
			form.resetDirty({notificationSettings: data});
			queryClient.setQueryData(['ownProfile'], (oldData: UserOwnProfileDto) => {
				return {
					...oldData,
					notificationSettings: data,
				} satisfies UserOwnProfileDto;
			});
		},
		onError: errorNotification,
	});

	const {t} = useLanguage();
	return (
		<>
			<Title order={3}>
				<ElementWithInfo text={<T k={'profile.notifications.title'}/>}
				                 tooltip={<T k={'profile.notifications.tooltip'}/>}
				                 multiline tooltipWidth={300} tooltipPosition={'right'}/>
			</Title>

			{form.getValues().notificationSettings.map((setting, index) => {
					const hoursInputProps = form.getInputProps(`notificationSettings.${index}.hoursBeforeEvent`);
					const minutesInputProps = form.getInputProps(`notificationSettings.${index}.minutesBeforeEvent`);
					return <Group key={setting.id ?? `i${index}`}>
						<ActionIcon color={'gray'} variant={'subtle'}
						            onClick={() => form.removeListItem('notificationSettings', index)}>
							<FontAwesomeIcon icon={faTrashCan}/>
						</ActionIcon>
						<NumberInput key={`notificationSettings.${index}.hoursBeforeEvent`} {...hoursInputProps}
						             min={0}
						             suffix={` ${t('hour', getOptions(form, index, 'hoursBeforeEvent'))}`}/>
						<NumberInput key={`notificationSettings.${index}.minutesBeforeEvent`} {...minutesInputProps}
						             min={0}
						             suffix={` ${t('minute', getOptions(form, index, 'minutesBeforeEvent'))}`}/>
						<Text><T k={'notifications.input.suffix'}/></Text>
					</Group>;
				},
			)}
			<Group justify={'space-between'}>
				<AddButton label={'notifications.add'}
				           onClick={() => form.insertListItem('notificationSettings', {
					           hoursBeforeEvent: 0,
					           minutesBeforeEvent: 0,
				           })}/>
				{(form.values.notificationSettings.length > 0 || form.isDirty()) &&
					<ElementWithInfo
						text={<ButtonWithDisabledTooltip color={'green'} onClick={() => mutate()}
						                                 disabled={!form.isDirty()} tooltip={'noChanges'}
						                                 loading={isPending}>
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
function getOptions(form: UseFormReturnType<GlobalNotificationSettingsProps>, index: number, key: 'hoursBeforeEvent' | 'minutesBeforeEvent'): TranslationOptions {
	const notificationSettingDtoElement = form.getValues().notificationSettings[index][key];
	return {count: notificationSettingDtoElement};
}
