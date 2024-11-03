import {GuildConfigDto} from '../../../guildTypes';
import {T} from '../../../../../components/T';
import {Select, Skeleton, TextInput} from '@mantine/core';
import {useLanguage} from '../../../../../contexts/language/Language';
import {JSX, useState} from 'react';
import slotbotServerClient from '../../../../../hooks/slotbotServerClient';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {errorNotification, successNotification} from '../../../../../utils/notificationHelper';
import {useDidUpdate} from '@mantine/hooks';
import {useGuildPage} from '../../../../../contexts/guild/GuildPageContext';
import {useGuildDiscordConfig} from '../../../../../contexts/guild/GuildDiscordConfigContext';

export function GuildArchive(props: Readonly<GuildConfigDto>): JSX.Element {
	const {archiveChannel} = props;
	const {guildId} = useGuildPage();
	const {t} = useLanguage();

	const [archive, setArchive] = useState<string | null>(archiveChannel);
	const putGuildConfig = () => slotbotServerClient.put(`/guilds/${guildId}/config`, {archiveChannel: archive}).then((res) => res.data);
	const {mutate} = useMutation<void, AxiosError>({
		mutationFn: putGuildConfig,
		onSuccess: () => {
			successNotification();
		},
		onError: errorNotification,
	});

	useDidUpdate(() => {
		mutate();
	}, [archive]);

	const integrationQuery = useGuildDiscordConfig();
	if (integrationQuery.isError) return <TextInput label={<T k={'guild.config.archive.description'}/>}
													error={<T k={'guild.config.archive.loadingError'}/>}
													disabled value={archive ?? '—'}/>;
	if (integrationQuery.isLoading || !integrationQuery.data) return <Skeleton width={'100%'} height={60.8}/>;
	const {categories} = integrationQuery.data;

	return (
		<Select label={<T k={'guild.config.archive.description'}/>} placeholder={t('guild.config.archive.select')}
				clearable searchable value={archive} onChange={setArchive}
				error={archive && categories.find(category => category.textChannels
					.find(textChannel => textChannel.id === archive) !== undefined) === undefined
					? t('guild.config.archive.error')
					: undefined}
				data={categories.map(category => ({
					group: category.name,
					items: category.textChannels.map(textChannel => ({
						value: textChannel.id,
						label: `# ${textChannel.name}`,
					})),
				}))}
		/>
	);
}
