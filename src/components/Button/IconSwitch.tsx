import {Box, Switch, SwitchProps, Tooltip, TooltipProps} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {omit} from 'lodash-es';
import {JSX} from 'react';
import classes from './IconSwitch.module.css';

type IconSwitchProps = Omit<SwitchProps, 'title'> & {
	/**
	 * Optional tooltip label surrounding the switch
	 */
	title?: TooltipProps['label'];
	onIcon: IconProp;
	offIcon: IconProp;
};

export function IconSwitch(props: Readonly<IconSwitchProps>): JSX.Element {
	const {disabled, title} = props;

	return <>
		{title ?
			<Tooltip mod={{disabled}} className={classes.root} label={props.title}>
				<Box>
					<IconSwitchElement {...props}/>
				</Box>
			</Tooltip>
			:
			<Box mod={{disabled}} className={classes.root}>
				<IconSwitchElement {...props}/>
			</Box>
		}
	</>;
}

function IconSwitchElement(props: Readonly<IconSwitchProps>): JSX.Element {
	return <Switch size={'md'}
				   onLabel={<FontAwesomeIcon icon={props.onIcon} size={'2x'} fixedWidth/>}
				   offLabel={<FontAwesomeIcon icon={props.offIcon} size={'2x'} fixedWidth/>}
				   {...omit(props, ['onIcon', 'offIcon', 'title'])}/>;
}
