import {createStyles, Switch, SwitchProps} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {useState} from 'react';

const useStyles = createStyles((theme) => ({
	root: {
		position: 'relative',
		'& *': {
			cursor: 'pointer',
		},
	},

	icon: {
		pointerEvents: 'none',
		position: 'absolute',
		zIndex: 1,
		top: 5,
	},

	iconOn: {
		left: 5,
	},

	iconOff: {
		left: 23,
	},
}));

type IconSwitchProps = {
	onIcon: IconProp;
	offIcon: IconProp;
	label: SwitchProps['label'];
	defaultChecked?: boolean;
};

export function IconSwitch(props: IconSwitchProps): JSX.Element {
	const {onIcon, offIcon, label, defaultChecked = false} = props;

	const [checked, setChecked] = useState(defaultChecked);
	const {classes, cx} = useStyles();

	return (
		<div className={classes.root}>
			{checked ?
				<FontAwesomeIcon icon={onIcon} className={cx(classes.icon, classes.iconOn)} size={'sm'}/>
				:
				<FontAwesomeIcon icon={offIcon} className={cx(classes.icon, classes.iconOff)} size={'sm'}/>
			}
			<Switch size="md" checked={checked} onChange={() => setChecked(prevState => !prevState)} label={label}/>
		</div>
	);
}
