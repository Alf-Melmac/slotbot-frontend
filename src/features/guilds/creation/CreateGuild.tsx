import {JSX} from 'react';
import {useLanguage} from '../../../contexts/language/Language';
import {Button, Stack, TextInput} from '@mantine/core';
import {T} from '../../../components/T';
import {useForm} from '@mantine/form';
import {requiredFieldWithMaxLength} from '../../../utils/formValidation';
import {TEXT} from '../../../utils/maxLength';
import {GuildCreateDto, GuildDetailsDto} from '../guildTypes';
import slotbotServerClient from '../../../hooks/slotbotServerClient';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import classes from './createGuild.module.css';
import {generatePath, useNavigate} from 'react-router';
import {AxiosError} from 'axios';

export function CreateGuild(): JSX.Element {
	const {t} = useLanguage();
	const form = useForm<GuildCreateDto>({
		mode: 'uncontrolled',
		validate: {
			groupIdentifier: requiredFieldWithMaxLength(TEXT),
		},
	});

	const queryClient = useQueryClient();
	const postGuild = (guild: GuildCreateDto) => slotbotServerClient
		.post('guilds', guild)
		.then((res) => res.data);
	const navigate = useNavigate();
	const {mutate, isPending} = useMutation<GuildDetailsDto, AxiosError, GuildCreateDto>({
		mutationFn: postGuild,
		onSuccess: (data) => {
			queryClient.invalidateQueries({queryKey: ['guilds']});
			navigate(generatePath('/guilds/:guildId', {guildId: data.id}));
		},
	});
	// TODO user gets signed out to get the permissions of the new guild

	return <form className={classes.form} onSubmit={form.onSubmit((values) => mutate(values))}>
		<Stack>
			<TextInput label={<T k={'guilds.create.label'}/>} placeholder={t('guilds.create.placeholder')}
					   required key={form.key('groupIdentifier')} {...form.getInputProps('groupIdentifier')}/>
			<Button type={'submit'} loading={isPending}><T k={'guilds.create.button'}/></Button>
		</Stack>
	</form>;
}
