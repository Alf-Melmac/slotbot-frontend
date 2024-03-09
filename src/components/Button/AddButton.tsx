import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {Group, GroupProps, Text, ThemeIcon, UnstyledButton} from '@mantine/core';
import {Link, LinkProps} from 'react-router-dom';
import {TextKey} from '../../contexts/language/Language';
import {T} from '../T';
import {JSX} from 'react';
import classes from './AddButton.module.css';

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

	return (
		<UnstyledButton onClick={onClick} disabled={disabled}
						{/*@ts-ignore TS doesn't understand this component*/...{}}
						component={to ? Link : UnstyledButton} to={to}>
			<Group gap={6} mt={mt} mb={mb}>
				<ThemeIcon variant={'filled'} radius={'xl'} className={classes.actionIcon}
						   mod={{disabled}}>
					<FontAwesomeIcon icon={faPlus}/>
				</ThemeIcon>
				<Text><T k={label}/></Text>
			</Group>
		</UnstyledButton>
	);
}
