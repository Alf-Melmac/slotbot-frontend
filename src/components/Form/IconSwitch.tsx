import {createStyles, Switch, SwitchProps} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {UseFormReturnType} from '@mantine/form';

const useStyles = createStyles(() => ({
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

type IconSwitchProps<FormReturnType> = {
	onIcon: IconProp;
	offIcon: IconProp;
	label: SwitchProps['label'];
	useFormReturn: UseFormReturnType<FormReturnType>;
	inputProp: keyof FormReturnType;
};

export function IconSwitch<FormReturnType>(props: IconSwitchProps<FormReturnType>): JSX.Element {
	const {onIcon, offIcon, label, useFormReturn, inputProp} = props;

	const {classes, cx} = useStyles();

	return (
		<div className={classes.root}>
			{useFormReturn.values[inputProp] ?
				<FontAwesomeIcon icon={onIcon} className={cx(classes.icon, classes.iconOn)} size={'sm'}/>
				:
				<FontAwesomeIcon icon={offIcon} className={cx(classes.icon, classes.iconOff)} size={'sm'}/>
			}
			<Switch size="md" label={label} {...useFormReturn.getInputProps(inputProp, {type: 'checkbox'})}/>
		</div>
	);
}
