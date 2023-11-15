import {Box, createStyles, Switch, SwitchProps, Tooltip, TooltipProps} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {omit} from 'lodash';
import {JSX} from 'react';

const useStyles = createStyles((_theme, disabled: boolean) => ({
	root: {
		'& *': {
			cursor: disabled ? 'not-allowed' : 'pointer',
		},
	},
}));

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
	const {classes} = useStyles(!!disabled);

	return <>
		{title ?
			<Tooltip className={classes.root} label={props.title}>
				<Box>
					<IconSwitchElement {...props}/>
				</Box>
			</Tooltip>
			:
			<div className={classes.root}>
				<IconSwitchElement {...props}/>
			</div>
		}
	</>;
}

function IconSwitchElement(props: Readonly<IconSwitchProps>) {
	return <Switch size={'md'}
				   onLabel={<FontAwesomeIcon icon={props.onIcon} size={'2x'} fixedWidth/>}
				   offLabel={<FontAwesomeIcon icon={props.offIcon} size={'2x'} fixedWidth/>}
				   {...omit(props, ['onIcon', 'offIcon', 'title'])}/>;
}
