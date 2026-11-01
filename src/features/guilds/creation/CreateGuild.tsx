import {JSX, useMemo} from 'react';
import {useLanguage} from '../../../contexts/language/Language';
import {Stack, TextInput} from '@mantine/core';
import {T} from '../../../components/T';
import {useForm} from '@mantine/form';
import {requiredFieldWithMaxLength} from '../../../utils/formValidation';
import {TEXT} from '../../../utils/maxLength';
import {GuildCreateDto, GuildDetailsDto} from '../guildTypes';
import slotbotServerClient from '../../../hooks/slotbotServerClient';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {generatePath, useNavigate} from 'react-router';
import {AxiosError} from 'axios';
import {useGetGuildsCategorised} from '../useGetGuilds';
import {errorNotification} from '../../../utils/notificationHelper';
import {validate} from '../../../utils/formHelper';
import {ButtonWithDisabledTooltip} from '../../../components/Button/ButtonWithDisabledTooltip';

export function CreateGuild(): JSX.Element {
	const {t} = useLanguage();

	const {data: guilds} = useGetGuildsCategorised();

	const takenIdentifiers = useMemo(() => new Set(guilds
		? [...guilds.active, ...guilds.inactive].map((guild) => guild.groupIdentifier.toLowerCase())
		: [],
	), [guilds]);

	function isTaken(value: string) {
		return takenIdentifiers.has(value.trim().toLowerCase());
	}

	const form = useForm<GuildCreateDto>({
		mode: 'uncontrolled',
		validate: {
			groupIdentifier: (value) => requiredFieldWithMaxLength(TEXT)(value)
				?? validate(isTaken(value), <T k={'guilds.create.taken'}/>),
		},
		validateInputOnChange: true,
		transformValues: (values) => ({groupIdentifier: values.groupIdentifier.trim()}),
	});

	const queryClient = useQueryClient();
	const postGuild = (guild: GuildCreateDto) => slotbotServerClient
		.post('guilds', guild)
		.then((res) => res.data);
	const navigate = useNavigate();
	const {mutate, isPending} = useMutation<GuildDetailsDto, AxiosError, GuildCreateDto>({
		mutationFn: postGuild,
		onSuccess: (data) => {
			void queryClient.invalidateQueries({queryKey: ['guilds']});
			void navigate(generatePath('/guilds/:guildId', {guildId: data.id}));
		},
		onError: errorNotification,
	});

	const error = form.errors.groupIdentifier;
	return <form onSubmit={form.onSubmit((values) => mutate(values))}>
		<Stack>
			<TextInput label={<T k={'guilds.create.label'}/>} placeholder={t('guilds.create.placeholder')}
					   required key={form.key('groupIdentifier')} {...form.getInputProps('groupIdentifier')}/>
			<ButtonWithDisabledTooltip type={'submit'}
									   loading={isPending}
									   disabled={!!error} tooltipNode={error}
									   w={'100%'}>
				<T k={'guilds.create.button'}/>
			</ButtonWithDisabledTooltip>
		</Stack>
	</form>;
}
