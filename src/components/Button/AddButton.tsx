import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {createStyles, Group, Text, ThemeIcon, UnstyledButton, UnstyledButtonProps} from '@mantine/core';

const useStyles = createStyles((theme) => ({
	actionIcon: { /*Copy pasta from mantine ActionIcon*/
		...theme.fn.hover({backgroundColor: theme.fn.variant({color: 'green', variant: 'filled'}).hover}),
		'&:active': theme.activeStyles,

		'&[data-disabled=true]': {
			color: theme.colors.gray[theme.colorScheme === 'dark' ? 6 : 4],
			backgroundColor: theme.fn.themeColor('gray', theme.colorScheme === 'dark' ? 8 : 1),
			borderColor: theme.fn.themeColor('gray', theme.colorScheme === 'dark' ? 8 : 1),

			'&:active': {
				transform: 'none',
			},
		},
	},
}));

type AddButtonProps = {
	label: string;
	onClick: () => void;
	disabled?: boolean;
	mt?: UnstyledButtonProps['mt'];
};

export function AddButton(props: AddButtonProps): JSX.Element {
	const {label, onClick, disabled, mt} = props;

	const {classes} = useStyles();

	return (
		<UnstyledButton onClick={onClick} disabled={disabled} mt={mt}>
			<Group spacing={6}>
				<ThemeIcon color={'green'} variant={'filled'} radius={'xl'} className={classes.actionIcon}
						   data-disabled={disabled}>
					<FontAwesomeIcon icon={faPlus}/>
				</ThemeIcon>
				<Text>{label}</Text>
			</Group>
		</UnstyledButton>
	);
}
