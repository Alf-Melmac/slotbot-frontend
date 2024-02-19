import {Avatar, Group, Menu, Text, UnstyledButton} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRightFromBracket, faChevronDown, faScrewdriverWrench, faUser} from '@fortawesome/free-solid-svg-icons';
import {ApplicationRoles, DiscordUserDto} from '../../contexts/authentication/authenticationTypes';
import {ThemeSwitchAsMenuItem} from '../ThemeSwitch';
import {NAV_ICON_SIZE} from './NavIcon';
import {Link} from 'react-router-dom';
import {useAuth} from '../../contexts/authentication/AuthProvider';
import {useCheckAccess} from '../../contexts/authentication/useCheckAccess';
import {T} from '../T';
import {JSX} from 'react';
import classes from './UserMenu .module.css';

type UserMenuProps = {
	user: DiscordUserDto;
};

export function UserMenu(props: Readonly<UserMenuProps>): JSX.Element {
	const {user} = props;
	const {logout} = useAuth();

	const sysAdmin = useCheckAccess(ApplicationRoles.ROLE_SYS_ADMIN);

	return (
		<Menu position={'bottom-end'}>
			<Menu.Target>
				<UnstyledButton className={classes.user}>
					<Group wrap={'nowrap'}>
						<Avatar src={user.avatarUrl} radius={NAV_ICON_SIZE} size={NAV_ICON_SIZE}/>
						<Text size={'sm'} fw={500}>
							{user.name}
						</Text>

						<FontAwesomeIcon icon={faChevronDown}/>
					</Group>
				</UnstyledButton>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Item leftSection={<FontAwesomeIcon icon={faUser}/>} component={Link} to={`/profile/${user.id}`}>
					<T k={'userMenu.myProfile'}/>
				</Menu.Item>
				<ThemeSwitchAsMenuItem/>
				<Menu.Item leftSection={<FontAwesomeIcon icon={faArrowRightFromBracket}/>} onClick={logout}>
					<T k={'userMenu.logout'}/>
				</Menu.Item>
				{sysAdmin &&
                    <>
                        <Menu.Label><T k={'userMenu.label.admin'}/></Menu.Label>
                        <Menu.Item leftSection={<FontAwesomeIcon icon={faScrewdriverWrench}/>}
                                   component={Link} to={'/admin/utils'}>
                            <T k={'userMenu.admin.utils'}/>
                        </Menu.Item>
                    </>
				}
			</Menu.Dropdown>
		</Menu>
	);
}
