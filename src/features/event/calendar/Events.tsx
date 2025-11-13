import {Box, Center, Group, Text, Title} from '@mantine/core';
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
import {AnchorBlank} from '../../../components/Text/AnchorBlank';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowUpRightFromSquare} from '@fortawesome/free-solid-svg-icons';
import {useIsGerman} from '../../../contexts/language/Language';

export function Events(): JSX.Element {
	useTranslatedDocumentTitle('documentTitle.events');
	const {guild, guildUrlPath} = useGuildContext();
	const isGerman = useIsGerman();

	const [isLoading, setIsLoading] = useState(true);
	const [animated, setAnimated] = useState(true);
	const isMobile = useIsMobile();
	return <>
		<Center>
			<Title><T k={'calendar.events'} args={[guild]}/></Title>
		</Center>

		{!guild &&
			<AnchorBlank
				href={isGerman ? 'https://docs.slotbot.de/jetzt-starten' : 'https://docs.slotbot.de/en/getting-started'}
				size={'lg'} maw={'max-content'}>
				<Group gap={6} wrap={'nowrap'}>
					<FontAwesomeIcon icon={faArrowUpRightFromSquare}/>
					<Text><T k={'calendar.gettingStarted'}/></Text>
				</Group>
			</AnchorBlank>
		}
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
