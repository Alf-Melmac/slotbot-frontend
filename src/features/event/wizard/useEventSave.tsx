import slotbotServerClient from '../../../hooks/slotbotServerClient';
import {generatePath, useNavigate} from 'react-router-dom';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {Alert, Center, Code, Loader, Stack, Text} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHandshakeSlash} from '@fortawesome/free-solid-svg-icons';
import {useFormContext} from '../../../contexts/event/action/EventActionFormContext';
import {UseFormReturnType} from '@mantine/form';
import {EventPostDto} from '../eventTypes';
import {cloneDeep} from 'lodash';
import {formatDate, formatTime} from '../../../utils/dateHelper';
import {useState} from 'react';
import {AnchorLink} from '../../../components/Text/AnchorLink';
import {T} from '../../../components/T';

export function useEventSave() {
	const form = useFormContext() as UseFormReturnType<EventPostDto>;

	const formValues = cloneDeep(form.values);
	// @ts-ignore At this point these must be Date's and not yet strings
	formValues.date = formatDate(form.values.date);
	// @ts-ignore
	formValues.startTime = formatTime(form.values.startTime);

	const [page, setPage] = useState(
		<>
			<DebugCodeBlock formValues={formValues}/>
			<Stack mt={'xl'}>
				<Text align={'center'}>
					<T k={'event.save.loading.partOne'}/> <AnchorLink
					to={'/events'}><T k={'clickHere'}/></AnchorLink> <T k={'event.save.loading.partThree'}/>
				</Text>
				<Center>
					<Loader size={'xl'} variant={'bars'}/>
				</Center>
			</Stack>
		</>,
	);

	const postEvent = () => slotbotServerClient.post('/events', formValues).then((res) => res.data);
	const navigate = useNavigate();
	const {mutate} = useMutation<number, AxiosError>(postEvent, {
		onSuccess: data => {
			navigate(generatePath('/events/:eventId', {eventId: data.toString()}));
		},
		onError: error => {
			setPage(
				<>
					<DebugCodeBlock formValues={formValues}/>
					<Center>
						<Alert icon={<FontAwesomeIcon icon={faHandshakeSlash}/>} color={'red'}
							   title={<T k={'error.notification'} args={[error.code ? ` (${error.code})` : '']}/>}>
							{error.message}
						</Alert>
					</Center>
				</>,
			);
		},
	});

	return {
		mutate,
		eventWizardFinish: page,
	};
}

function DebugCodeBlock(props: { formValues: EventPostDto }): JSX.Element {
	return (
		<Code block sx={{display: 'none'}}>
			{JSON.stringify(props.formValues, null, 2)}
		</Code>
	);
}
