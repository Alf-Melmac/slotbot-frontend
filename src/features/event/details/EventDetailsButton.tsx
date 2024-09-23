import {ActionIcon, ActionIconProps, PolymorphicComponentProps, Tooltip} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {Link, LinkProps} from 'react-router-dom';
import {JSX} from 'react';
import {TextKey} from '../../../contexts/language/Language';
import {T} from '../../../components/T';

type EventDetailsButtonProps = PolymorphicComponentProps<'button', ActionIconProps> & {
	icon: IconDefinition;
	tooltip: TextKey;
};

export function EventDetailsButton(props: Readonly<EventDetailsButtonProps>) {
	const {tooltip, icon, ...actionIconProps} = props;

	return <Tooltip label={<T k={tooltip}/>}>
		<ActionIcon color={'gray'} variant={'subtle'} size={'xl'} {...actionIconProps}>
			<FontAwesomeIcon icon={icon} size={'2x'}/>
		</ActionIcon>
	</Tooltip>;
}

type EventDetailsLinkButtonProps = LinkProps & Pick<EventDetailsButtonProps, 'icon' | 'tooltip'>;

export function EventDetailsLinkButton(props: Readonly<EventDetailsLinkButtonProps>): JSX.Element {
	const {tooltip, icon, ...linkProps} = props;

	return <Tooltip label={<T k={tooltip}/>}>
		<ActionIcon color={'gray'} variant={'subtle'} size={'xl'} component={Link} {...linkProps}>
			<FontAwesomeIcon icon={icon} size={'2x'}/>
		</ActionIcon>
	</Tooltip>;
}
