import {UserOwnProfileDto} from './profileTypes';
import {ElementWithInfo} from '../../components/Text/ElementWithInfo';
import {Box, Button, CopyButton, Switch, Text, Title, Tooltip} from '@mantine/core';
import {useForm} from '@mantine/form';
import {AnchorBlank} from '../../components/Text/AnchorBlank';
import {useEffect, useState} from 'react';
import slotbotServerClient, {voidFunction} from '../../hooks/slotbotServerClient';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {errorNotification, successNotification} from '../../utils/notificationHelper';
import {T} from '../../components/T';

type ExternalCalendarSettingsProps = Pick<UserOwnProfileDto, 'externalCalendarIntegrationActive' | 'icsCalendarUrl'>;

export function ExternalCalendarSettings(props: ExternalCalendarSettingsProps): JSX.Element {
	const {externalCalendarIntegrationActive, icsCalendarUrl} = props;

	const form = useForm<{ externalCalendarIntegrationActive: UserOwnProfileDto['externalCalendarIntegrationActive'] }>({
		initialValues: {
			externalCalendarIntegrationActive: externalCalendarIntegrationActive,
		},
	});

	useEffect(() => {
		if (form.isTouched()) {
			mutate();
		}
	}, [form.values.externalCalendarIntegrationActive]);

	const [saving, setSaving] = useState(false);
	const postCalendarSetting = () => slotbotServerClient.put(`/user/externalcalendar/${!form.values.externalCalendarIntegrationActive}`).then(voidFunction);
	const {mutate} = useMutation<void, AxiosError>(postCalendarSetting, {
		onMutate: () => {
			setSaving(true);
		},
		onSuccess: () => successNotification(),
		onError: errorNotification,
		onSettled: () => {
			setSaving(false);
		},
	});

	return (
		<>
			<Title order={3}>
				<ElementWithInfo text={<T k={'profile.externalCalendar.title'}/>}
								 tooltip={<T k={'profile.externalCalendar.tooltip'}/>}
								 multiline tooltipWidth={300} tooltipPosition={'right'}/>
			</Title>
			<Switch label={<T k={'profile.externalCalendar.switch'}/>} disabled={saving}
					{...form.getInputProps('externalCalendarIntegrationActive', {type: 'checkbox'})}/>
			{form.values.externalCalendarIntegrationActive && <>
                <Tooltip.Floating label={<T k={'action.clickToCopy'}/>}>
                    <Box>
                        <CopyButton value={icsCalendarUrl}>
							{({copied, copy}) => (
								<Button color={copied ? 'teal' : 'blue'} variant={'outline'} onClick={copy}
										sx={{width: '100%'}}>
									{icsCalendarUrl}
								</Button>
							)}
                        </CopyButton>
                    </Box>
                </Tooltip.Floating>
                <Text>
                    <T k={'profile.externalCalendar.tutorial.partOne'}/> <AnchorBlank
                    href={'https://docs.webalf.de/slotbot/eventkalender#kalender-synchronisation'}>
                    <T k={'profile.externalCalendar.tutorial.partTwo'}/></AnchorBlank>.
                </Text>
            </>
			}
		</>
	);
}
