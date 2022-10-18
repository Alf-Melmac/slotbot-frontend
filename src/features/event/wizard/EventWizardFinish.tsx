import {Alert, Center, Code, Loader, Stack, Text} from '@mantine/core';
import {AnchorLink} from '../../../components/Text/AnchorLink';
import slotbotServerClient from '../../../hooks/slotbotServerClient';
import {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHandshakeSlash} from '@fortawesome/free-solid-svg-icons';
import {generatePath, useNavigate} from 'react-router-dom';
import {EventPostDto} from '../eventTypes';
import {AxiosError} from 'axios';
import {cloneDeep} from 'lodash';
import {formatDate, formatTime} from '../../../utils/dateHelper';
import {useMutation} from '@tanstack/react-query';
import {useFormContext} from '../action/EventActionFormContext';
import {UseFormReturnType} from '@mantine/form';

export function EventWizardFinish(): JSX.Element {
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
					Das Event wird gerade gespeichert. Bei Erfolg wirst du automatisch weitergeleitet.
					Falls dies nicht funktioniert, kommst du <AnchorLink
					to={'/events'}>hier</AnchorLink> wieder zum Kalender.
				</Text>
				<Center>
					<Loader size={'xl'} variant={'bars'}/>
				</Center>
			</Stack>
		</>,
	);

	const postEvent = () => slotbotServerClient.post('http://localhost:8090/events', formValues).then((res) => res.data);
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
							   title={`Speichern fehlgeschlagen. (${error.code})`}>
							{error.message}
						</Alert>
					</Center>
				</>,
			);
		},
	});

	useEffect(() => {
		mutate();
	}, []);

	return page;
}

function DebugCodeBlock(props: { formValues: EventPostDto }): JSX.Element {
	return (
		<Code block sx={{display: 'none'}}>
			{JSON.stringify(props.formValues, null, 2)}
		</Code>
	);
}
