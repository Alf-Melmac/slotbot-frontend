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
	const {onIcon, offIcon, disabled, title} = props;
	const {classes} = useStyles(!!disabled);

	return <>
		{title ?
			<Tooltip className={classes.root} label={props.title}>
				<Box>
					<Switch size={'md'}
							onLabel={<FontAwesomeIcon icon={onIcon} size={'2x'}/>}
							offLabel={<FontAwesomeIcon icon={offIcon} size={'2x'}/>}
							{...omit(props, ['onIcon', 'offIcon', 'title'])}/>
				</Box>
			</Tooltip>
			:
			<div className={classes.root}>
				<Switch size={'md'}
						onLabel={<FontAwesomeIcon icon={onIcon} size={'2x'}/>}
						offLabel={<FontAwesomeIcon icon={offIcon} size={'2x'}/>}
						{...omit(props, ['onIcon', 'offIcon', 'title'])}/>
			</div>
		}
	</>;
}
