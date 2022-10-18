import {UserOwnProfileDto} from './profileTypes';
import {ElementWithInfo} from '../../components/Text/ElementWithInfo';
import {Box, Button, CopyButton, Switch, Text, Title, Tooltip} from '@mantine/core';
import {useForm} from '@mantine/form';
import {AnchorBlank} from '../../components/Text/AnchorBlank';
import {useEffect, useState} from 'react';
import slotbotServerClient, {voidFunction} from '../../hooks/slotbotServerClient';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {showNotification} from '@mantine/notifications';

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
		onSuccess: () => {
			showNotification({title: 'Gespeichert', message: <></>, color: 'green'});
		},
		onError: error => {
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
				<ElementWithInfo text={'Externer Kalender'}
								 tooltip={'Aktiviere hier die Integration mit externen Kalendern, um deine Events z.B. auf dem Handy einfügen zu können.'}
								 multiline tooltipWidth={300} tooltipPosition={'right'}/>
			</Title>
			<Switch label={'Kalenderintegration aktivieren '} disabled={saving}
					{...form.getInputProps('externalCalendarIntegrationActive', {type: 'checkbox'})}/>
			{form.values.externalCalendarIntegrationActive && <>
                <Tooltip.Floating label={'Klicken zum Kopieren'}>
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
                <Text>Anleitungen zum Einbinden dieser Datei im <AnchorBlank
                    href={'https://docs.webalf.de/slotbot/eventkalender#kalender-synchronisation'}>Wiki</AnchorBlank>.</Text>
            </>
			}
		</>
	);
}
