import {GuildProps} from '../Guild';
import {GuildConfigDto, Language} from '../../guildTypes';
import {useState} from 'react';
import slotbotServerClient from '../../../../hooks/slotbotServerClient';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {errorNotification, successNotification} from '../../../../utils/notificationHelper';
import {useDidUpdate} from '@mantine/hooks';
import {Group, Radio} from '@mantine/core';
import {T} from '../../../../components/T';
import {DEFlag, GBFlag} from 'mantine-flagpack';

type GuildLanguageProps = GuildProps & GuildConfigDto;

export function GuildLanguage(props: GuildLanguageProps): JSX.Element {
	const {guildId, language} = props;
	const [selectedLanguage, setSelectedLanguage] = useState(language);
	const [savedLanguage, setSavedLanguage] = useState(language);

	const putGuildConfig = () => slotbotServerClient.put(`/guilds/${guildId}/config`, {language: selectedLanguage}).then((res) => res.data);
	const {mutate} = useMutation<void, AxiosError>(putGuildConfig, {
		onSuccess: () => {
			setSavedLanguage(selectedLanguage);
			successNotification(selectedLanguage);
		},
		onError: (...props) => {
			setSelectedLanguage(savedLanguage);
			errorNotification?.(...props);
		},
	});

	useDidUpdate(() => {
		selectedLanguage !== savedLanguage && mutate();
	}, [selectedLanguage]);

	return (
		<Radio.Group label={<T k={'guild.config.language.description'}/>} withAsterisk
					 value={selectedLanguage} onChange={(value) => setSelectedLanguage(value as Language)}>
			<Group mt={'xs'}>
				<Radio value={Language.DE}
					   label={<><DEFlag w={'1rem'} radius={'xs'}/> <T k={'language.german'}/></>}/>
				<Radio value={Language.EN}
					   label={<><GBFlag w={'1rem'} radius={'xs'}/> <T k={'language.english'}/></>}/>
			</Group>
		</Radio.Group>
	);
}
