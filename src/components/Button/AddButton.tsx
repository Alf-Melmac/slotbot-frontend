import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {createStyles, Group, GroupProps, Text, ThemeIcon, UnstyledButton} from '@mantine/core';
import {Link, LinkProps} from 'react-router-dom';
import {TextKey} from '../../contexts/language/Language';
import {T} from '../T';
import {JSX} from 'react';

const useStyles = createStyles((theme) => ({
	actionIcon: { /*Copy pasta from mantine ActionIcon*/
		...theme.fn.hover({backgroundColor: theme.fn.variant({color: theme.primaryColor, variant: 'filled'}).hover}),
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
	label: TextKey;
	disabled?: boolean;
	mt?: GroupProps['mt'];
	mb?: GroupProps['mb'];
} & (
	| {
	onClick: () => void;
	to?: never;
}
	| {
	onClick?: never;
	to: LinkProps['to'];
}
	);

export function AddButton(props: Readonly<AddButtonProps>): JSX.Element {
	const {label, disabled, mt, mb, onClick, to} = props;

	const {classes} = useStyles();

	return (
		<UnstyledButton onClick={onClick} disabled={disabled}
						{/*@ts-ignore TS doesn't understand this component*/...{}}
						component={to ? Link : UnstyledButton} to={to}>
			<Group spacing={6} mt={mt} mb={mb}>
				<ThemeIcon variant={'filled'} radius={'xl'} className={classes.actionIcon}
						   data-disabled={disabled}>
					<FontAwesomeIcon icon={faPlus}/>
				</ThemeIcon>
				<Text><T k={label}/></Text>
			</Group>
		</UnstyledButton>
	);
}
