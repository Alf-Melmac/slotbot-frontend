import {LoadingOverlay} from '@mantine/core';
import {Breadcrumb} from '../../../components/Breadcrumb';
import {JSX, useState} from 'react';
import {EventDetailsDto} from '../eventTypes';
import {randomColor} from '../action/utils';
import {eventActionValidate} from '../action/validation';
import {EventWizardProvider, useEventWizardForm} from '../../../contexts/event/action/EventActionFormContext';
import {EventWizardSteps} from './EventWizardSteps';
import {useEventCopy} from './useEventCopy';
import {useTranslatedDocumentTitle} from '../../../hooks/useDocumentTitle';
import {getTimeShort} from '../../../utils/dateHelper';
import {useAuth} from '../../../contexts/authentication/AuthProvider';
import {useGuildContext} from '../../../contexts/guildcontext/GuildContext';

export type EventWizardLocation = {
	copy: EventDetailsDto['id'];
}

export default function EventWizard(): JSX.Element {
	useTranslatedDocumentTitle('documentTitle.event.new');
	const {guildUrlPath} = useGuildContext();
	const breadcrumbItems = [
		{
			title: 'breadcrumb.calendar',
			href: `/events/calendar${guildUrlPath}`,
		},
		{
			title: 'breadcrumb.event.new',
		},
	];

	const [active, setActive] = useState(0);

	const date = new Date();
	const {user} = useAuth();
	const form = useEventWizardForm({
		initialValues: {
			hidden: false,
			shareable: true,
			name: '',
			date: date,
			startTime: getTimeShort(date),
			creator: user?.name ?? '',
			// @ts-ignore No existing id
			eventType: {
				name: '',
				color: randomColor(),
			},
			description: '',
			missionType: '',
			missionLength: '',
			pictureUrl: '',
			details: [],
			squadList: [],
			reserveParticipating: undefined,
		},
		validate: (values) => eventActionValidate(values, active),
		//Works only on first page as no state can be used inside on change validation (https://discord.com/channels/854810300876062770/1026255061241839627)
		validateInputOnChange: ['name', 'date', 'creator', 'eventType', 'missionType', 'missionLength', 'pictureUrl'],
		validateInputOnBlur: true,
	});

	const {isLoading} = useEventCopy(form);

	return (
		<EventWizardProvider form={form}>
			<Breadcrumb items={breadcrumbItems}/>

			<LoadingOverlay visible={isLoading}/>
			<EventWizardSteps active={active} setActive={setActive}/>
		</EventWizardProvider>
	);
}
