import {Box, Center, Title} from '@mantine/core';
import {LoadingCalendar} from './LoadingCalendar';
import {EventCalendar} from './EventCalendar';
import {JSX, useState} from 'react';
import {T} from '../../../components/T';
import {useTranslatedDocumentTitle} from '../../../hooks/useDocumentTitle';
import classes from './Events.module.css';
import {useGuildContext} from '../../../contexts/guildcontext/GuildContext';
import cx from 'clsx';
import {useIsMobile} from '../../../hooks/isMobile';
import {LoadingMobileCalendar} from './mobile/LoadingMobileCalendar';
import {useCheckAccess} from '../../../contexts/authentication/useCheckAccess';
import {ApplicationRoles} from '../../../contexts/authentication/authenticationTypes';
import {AddButton} from '../../../components/Button/AddButton';

export function Events(): JSX.Element {
	useTranslatedDocumentTitle('documentTitle.events');
	const {guild, guildUrlPath} = useGuildContext();

	const [isLoading, setIsLoading] = useState(true);
	const [animated, setAnimated] = useState(true);
	const isMobile = useIsMobile();
	return <>
		<Center>
			<Title><T k={'calendar.events'} args={[guild]}/></Title>
		</Center>

		{useCheckAccess(ApplicationRoles.ROLE_EVENT_MANAGE) &&
			<AddButton label={'event.add'} to={`/events${guildUrlPath}/new`} mb={'sm'}/>
		}

		{isLoading &&
			(isMobile
				? <LoadingMobileCalendar animated={animated}/>
				: <LoadingCalendar animated={animated}/>)
		}
		<Box className={cx({[classes.hidden]: isLoading})}>
			<EventCalendar toggleVisible={setIsLoading} onFailure={() => setAnimated(false)}/>
		</Box>
	</>;
}
