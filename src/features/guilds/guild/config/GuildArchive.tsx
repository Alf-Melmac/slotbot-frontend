import {GuildConfigDto} from '../../guildTypes';
import {useGetDiscordIntegration} from '../useGetGuild';
import {T} from '../../../../components/T';
import {Button, createStyles, Select, Skeleton, TextInput} from '@mantine/core';
import {useLanguage} from '../../../../contexts/language/Language';
import {useState} from 'react';
import slotbotServerClient from '../../../../hooks/slotbotServerClient';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {errorNotification, successNotification} from '../../../../utils/notificationHelper';
import {useDidUpdate} from '@mantine/hooks';
import {AnchorBlank} from '../../../../components/Text/AnchorBlank';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDiscord} from '@fortawesome/free-brands-svg-icons';
import {useGuildPage} from '../../../../contexts/guild/GuildPageContext';

const useStyles = createStyles(() => ({
	group: {
		fontSize: 'unset',
		color: 'unset',
	},
}));

export function GuildArchive(props: GuildConfigDto): JSX.Element {
	const {archiveChannel} = props;
	const {guildId} = useGuildPage();
	const {classes} = useStyles();
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

	const integrationQuery = useGetDiscordIntegration(guildId);
	if (integrationQuery.isError) return <TextInput label={<T k={'guild.config.archive.description'}/>}
													error={<T k={'guild.config.archive.loadingError'}/>}
													disabled value={archive ?? '—'}/>;
	if (integrationQuery.isLoading || !integrationQuery.data) return <Skeleton width={'100%'} height={60.8}/>;
	const {connected, categories} = integrationQuery.data;
	if (!connected) return <Button color={'blue'} mt={3}
								   leftIcon={<FontAwesomeIcon icon={faDiscord}/>}
								   component={AnchorBlank} href={'https://slotbot.de/invite'}>
		<T k={'integration.discord.invite'}/>
	</Button>;

	return (
		<Select label={<T k={'guild.config.archive.description'}/>} placeholder={t('guild.config.archive.select')}
				clearable searchable classNames={{separatorLabel: classes.group}} value={archive} onChange={setArchive}
				error={archive && categories.find(category => category.textChannels
					.find(textChannel => textChannel.id === archive) !== undefined) === undefined
					? t('guild.config.archive.error')
					: undefined}
				data={categories
					.flatMap(category => category.textChannels
						.map(textChannel => ({
							value: textChannel.id,
							label: `# ${textChannel.name}`,
							group: category.name,
						})))}/>
	);
}
