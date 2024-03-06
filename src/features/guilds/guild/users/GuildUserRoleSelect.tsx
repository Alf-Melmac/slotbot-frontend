import {Badge, Combobox, InputBase, Stack, Text, useCombobox} from '@mantine/core';
import {Dispatch, JSX, SetStateAction} from 'react';
import {RoleItem} from './GuildUserRole';
import {T} from '../../../../components/T';
import {GuildUserRoleSelected} from './GuildUserRoleSelected';
import classes from './GuildUserRoleSelect.module.css';

type GuildUserRoleSelectProps = {
	roles: RoleItem[];
	matchingRole: RoleItem;
	setSelectedRole: Dispatch<SetStateAction<string | null>>;
};

export function GuildUserRoleSelect(props: Readonly<GuildUserRoleSelectProps>): JSX.Element {
	const {roles, matchingRole, setSelectedRole} = props;

	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
		onDropdownOpen: (eventSource) => {
			if (eventSource === 'keyboard') {
				combobox.selectActiveOption();
			} else {
				combobox.updateSelectedOptionIndex('active');
			}
		},
	});

	const options = roles.map((item) => (
		<Combobox.Option value={item.value} key={item.value} active={item === matchingRole}
						 mod={{selected: item === matchingRole}}
						 className={classes.option}>
			<GuildUserRoleSelection {...item}/>
		</Combobox.Option>
	));

	return (
		<Combobox
			store={combobox}
			onOptionSubmit={(val) => {
				setSelectedRole(val);
				combobox.closeDropdown();
			}}
		>
			<Combobox.Target>
				<InputBase
					component="button"
					type="button"
					pointer
					rightSection={<Combobox.Chevron/>}
					onClick={() => combobox.toggleDropdown()}
					rightSectionPointerEvents="none"
					multiline
					variant={'unstyled'}
					maw={200}
				>
					<GuildUserRoleSelected role={matchingRole}/>
				</InputBase>
			</Combobox.Target>

			<Combobox.Dropdown>
				<Combobox.Options>{options}</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);
}

function GuildUserRoleSelection({label, description, color}: Readonly<RoleItem>) {
	return (
		<Stack gap={'xs'} my={3}>
			<Badge color={color} variant={'filled'}>
				{label}
			</Badge>
			{description &&
                <Text size={'xs'} opacity={0.65}><T k={description}/></Text>
			}
		</Stack>
	);
}
