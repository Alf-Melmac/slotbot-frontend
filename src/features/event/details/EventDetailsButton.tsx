import {ApplicationRoles} from '../../../contexts/authentication/authenticationTypes';
import {ActionIcon} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {Link, LinkProps} from 'react-router-dom';
import {omit} from 'lodash';
import {useCheckAccess} from '../../../contexts/authentication/useCheckAccess';
import {JSX} from 'react';

interface EventDetailsButtonProps extends LinkProps {
	icon: IconDefinition;
}

export function EventDetailsButton(props: Readonly<EventDetailsButtonProps>): JSX.Element {
	const allowed = useCheckAccess(ApplicationRoles.ROLE_EVENT_MANAGE);

	return <>
		{allowed &&
            <ActionIcon variant={'subtle'} size={'xl'} component={Link} {...omit(props, 'icon')}>
                <FontAwesomeIcon icon={props.icon} size={'2x'}/>
            </ActionIcon>
		}
	</>;
}
