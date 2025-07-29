import {Box, Switch, SwitchProps, Tooltip, TooltipProps} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
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
			<Tooltip mod={{disabled}} className={classes.root} label={title}>
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
	const {onIcon, offIcon, title: _, ...rest} = props;

	return <Switch size={'md'}
				   onLabel={<FontAwesomeIcon icon={onIcon} size={'2x'}/>}
				   offLabel={<FontAwesomeIcon icon={offIcon} size={'2x'}/>}
				   {...rest}/>;
}
