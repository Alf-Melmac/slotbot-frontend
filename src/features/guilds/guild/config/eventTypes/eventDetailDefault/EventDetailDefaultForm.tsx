import {Fragment, JSX} from 'react';
import {
	EventDetailDefaultDto,
	EventDetailDefaultPostDto,
} from '../../../../../eventDetailsDefault/eventDetailsDefaultTypes';
import {useForm} from '@mantine/form';
import {requiredField, requiredFieldWithMaxLength} from '../../../../../../utils/formValidation';
import {EMBEDDABLE_TITLE} from '../../../../../../utils/maxLength';
import {filterFrontendIds} from '../../../../../../utils/formHelper';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import slotbotServerClient from '../../../../../../hooks/slotbotServerClient';
import {AxiosError} from 'axios';
import {successNotification} from '../../../../../../utils/notificationHelper';
import {Button, Group, Skeleton, Stack} from '@mantine/core';
import {AddButton} from '../../../../../../components/Button/AddButton';
import {randomId} from '@mantine/hooks';
import {MAX_DETAILS} from '../../../../../event/action/details/EventDetails';
import {CounterBadge} from '../../../../../../components/Form/CounterBadge';
import {T} from '../../../../../../components/T';
import {useGuildPage} from '../../../../../../contexts/guild/GuildPageContext';
import {EventTypeDto} from '../../../../../event/eventTypes';
import {useEventTypeDefaultsForGuild} from '../../../../../eventDetailsDefault/useEventTypeDefaults';
import {EventDetailDefaultFormItem} from './EventDetailDefaultFormItem';

type EventDetailDefaultFormProps = Pick<EventTypeDto, 'id'> & {
	onSuccess: () => void;
};

export type DetailDefaultFormType = {
	fields: EventDetailDefaultPostDto[];
};

export function EventDetailDefaultForm({id, onSuccess}: Readonly<EventDetailDefaultFormProps>): JSX.Element {
	const {guildId} = useGuildPage();
	const {query, defaultFields} = useEventTypeDefaultsForGuild(id, guildId);
	if (query.isLoading) return <Skeleton height={90}/>;

	return <Form defaultFields={defaultFields as unknown as EventDetailDefaultPostDto[]}
				 id={id}
				 onSuccess={onSuccess}/>;
}

type FormProps = EventDetailDefaultFormProps & {
	defaultFields: EventDetailDefaultPostDto[] | undefined;
}

function Form(props: Readonly<FormProps>): JSX.Element {
	const {defaultFields, id, onSuccess} = props;

	const form = useForm<DetailDefaultFormType>({
		mode: 'uncontrolled',
		validateInputOnChange: true,
		initialValues: {
			fields: defaultFields ?? [],
		},
		validate: {
			fields: {
				title: requiredFieldWithMaxLength(EMBEDDABLE_TITLE),
				//Text length is validated in the editor to validate the resulting markdown
				selection: (value, values, path) => {
					//path is fields.INDEX.selection
					const index = Number(path.split('.').at(-2));
					if (values.fields[index].type === 'TEXT_WITH_SELECTION') {
						return requiredField()(value);
					}
					return null;
				},
			},
		},
		transformValues: (values) => ({
			fields: filterFrontendIds(values.fields),
		}),
	});

	const detailsCount = form.getValues().fields.length;

	const {guildId} = useGuildPage();
	const queryClient = useQueryClient();
	const putEventTypeDefaults = (details: EventDetailDefaultPostDto[]) => slotbotServerClient
		.put(`/events/types/${guildId}/${id}/defaults`, details)
		.then((res) => res.data);
	const {mutate, isPending} = useMutation<EventDetailDefaultDto[], AxiosError, EventDetailDefaultPostDto[]>({
		mutationFn: putEventTypeDefaults,
		onSuccess: (data) => {
			onSuccess();
			successNotification();
			queryClient.setQueryData(['field-defaults', id], () => data);
		},
	});

	return <form onSubmit={form.onSubmit((values) => mutate(values.fields))}>
		<Stack>
			{form.getValues().fields.map((field, index) => (
				<Fragment key={field.id}>
					<EventDetailDefaultFormItem form={form} index={index}/>
				</Fragment>
			))}

			<Group gap={'xs'} mt={'xs'}>
				<AddButton label={'event.details.add'}
						   onClick={() => form.insertListItem('fields', {
							   id: randomId(),
							   title: '',
							   type: 'TEXT',
							   text: '',
						   } as EventDetailDefaultPostDto)}
						   disabled={detailsCount >= MAX_DETAILS}/>
				<CounterBadge currentValue={detailsCount} maxValue={MAX_DETAILS} yellowPhase/>
			</Group>

			<Button type={'submit'} disabled={!form.isDirty() || !form.isValid()} loading={isPending}>
				<T k={'action.save'}/>
			</Button>
		</Stack>
	</form>;
}
