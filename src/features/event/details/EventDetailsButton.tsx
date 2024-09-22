import {ApplicationRoles} from '../../../contexts/authentication/authenticationTypes';
import {ActionIcon, Tooltip} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {Link, LinkProps} from 'react-router-dom';
import {omit} from 'lodash-es';
import {useCheckAccess} from '../../../contexts/authentication/useCheckAccess';
import {JSX} from 'react';
import {TextKey} from '../../../contexts/language/Language';
import {T} from '../../../components/T';

interface EventDetailsButtonProps extends LinkProps {
	icon: IconDefinition;
	tooltip: TextKey;
}

export function EventDetailsButton(props: Readonly<EventDetailsButtonProps>): JSX.Element {
	const allowed = useCheckAccess(ApplicationRoles.ROLE_EVENT_MANAGE);

	return <>
		{allowed &&
			<Tooltip label={<T k={props.tooltip}/>}>
            <ActionIcon color={'gray'} variant={'subtle'} size={'xl'} component={Link} {...omit(props, 'icon')}>
                <FontAwesomeIcon icon={props.icon} size={'2x'}/>
            </ActionIcon>
			</Tooltip>
		}
	</>;
}
