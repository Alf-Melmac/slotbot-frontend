import {Box, createStyles, Switch, SwitchProps, Tooltip} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {omit} from 'lodash';

const useStyles = createStyles((_theme, disabled: boolean) => ({
	root: {
		'& *': {
			cursor: disabled ? 'not-allowed' : 'pointer',
		},
	},
}));

interface IconSwitchProps extends SwitchProps {
	onIcon: IconProp;
	offIcon: IconProp;
}

export function IconSwitch(props: IconSwitchProps): JSX.Element {
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

const useElementStyles = createStyles((theme) => ({
	labelWrapper: {
		display: 'flex',

		label: {
			paddingLeft: theme.spacing.xs,
		},
		'*': {
			paddingLeft: 0,
		},
	},
}));

function IconSwitchElement(props: IconSwitchProps) {
	const {classes} = useElementStyles();

	return <Switch size={'md'} classNames={{labelWrapper: classes.labelWrapper}}
				   onLabel={<FontAwesomeIcon icon={props.onIcon} size={'2x'} fixedWidth/>}
				   offLabel={<FontAwesomeIcon icon={props.offIcon} size={'2x'} fixedWidth/>}
				   {...omit(props, ['onIcon', 'offIcon', 'title'])}/>;
}
