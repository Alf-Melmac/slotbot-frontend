import {useEffect, useState} from 'react';
import checkAccessQuery from '../../../contexts/authentication/checkAccessQuery';
import {ApplicationRoles} from '../../../contexts/authentication/authenticationTypes';
import {ActionIcon} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {Link, LinkProps} from 'react-router-dom';
import {omit} from 'lodash';

interface EventDetailsButtonProps extends LinkProps {
	icon: IconDefinition;
}

export function EventDetailsButton(props: EventDetailsButtonProps): JSX.Element {
	const [allowed, setAllowed] = useState(false);

	const {query, accessAllowed} = checkAccessQuery(ApplicationRoles.ROLE_EVENT_MANAGE);
	useEffect(() => {
		if (query.isSuccess) {
			setAllowed(accessAllowed || false);
		}
	}, [accessAllowed]);

	return <>
		{allowed &&
            <ActionIcon variant={'subtle'} size={'xl'} component={Link} {...omit(props, 'icon')}>
                <FontAwesomeIcon icon={props.icon} size={'2x'}/>
            </ActionIcon>
		}
	</>;
}
