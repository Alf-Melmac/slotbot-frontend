import {Accordion, Radio, Title} from '@mantine/core';
import {T} from '../../../components/T';
// @ts-ignore https://github.com/mantinedev/mantine-flagpack/pull/3
import {DEFlag, GBFlag} from 'mantine-flagpack';
import {GuildProps} from './Guild';
import {useGetGuildConfig} from './useGetGuild';
import {GuildConfigDto, Language} from '../guildTypes';
import {useState} from 'react';
import slotbotServerClient from '../../../hooks/slotbotServerClient';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {successNotification} from '../../../utils/notificationHelper';
import {useDidUpdate} from '@mantine/hooks';
import {GuildEventTypes} from './GuildEventTypes';

export function GuildConfig(props: GuildProps): JSX.Element {
	const {guildId} = props;
	const guildConfigQuery = useGetGuildConfig(guildId);
	const guildConfig = guildConfigQuery.data;
	if (guildConfigQuery.isLoading || !guildConfig) return <></>;

	return <>
		<Title order={3}>Konfiguration</Title>
		<Accordion>
			<Accordion.Item value={'language'}>
				<Accordion.Control><T k={'language'}/></Accordion.Control>
				<Accordion.Panel>
					<GuildLanguage guildId={guildId} {...guildConfig}/>
				</Accordion.Panel>
			</Accordion.Item>
			<Accordion.Item value={'types'}>
				<Accordion.Control><T k={'event.eventTypes'}/></Accordion.Control>
				<Accordion.Panel>
					<GuildEventTypes guildId={guildId}/>
				</Accordion.Panel>
			</Accordion.Item>
		</Accordion>


		<Title order={3} mt={'lg'}>Spieler</Title>
	</>;
}

type GuildLanguageProps = GuildProps & GuildConfigDto;

function GuildLanguage(props: GuildLanguageProps) {
	const {guildId, language} = props;
	const [selectedLanguage, setSelectedLanguage] = useState<Language>(language);

	const putGuildConfig = () => slotbotServerClient.put(`/guilds/${guildId}/config`, {language: selectedLanguage}).then((res) => res.data);
	const {mutate} = useMutation<void, AxiosError>(putGuildConfig, {
		onSuccess: () => successNotification(selectedLanguage),
	});

	useDidUpdate(() => {
		selectedLanguage && mutate();
	}, [selectedLanguage]);

	return <>
		<T k={'guild.language.description'}/>
		<Radio.Group value={selectedLanguage} onChange={(value) => setSelectedLanguage(value as Language)} withAsterisk>
			<Radio value={Language.DE}
				   label={<><DEFlag w={'1rem'} radius={'xs'}/> <T k={'language.german'}/></>}/>
			<Radio value={Language.EN}
				   label={<><GBFlag w={'1rem'} radius={'xs'}/> <T k={'language.english'}/></>}/>
		</Radio.Group>
	</>;
}
