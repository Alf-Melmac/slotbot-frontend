import {Avatar, Group, Menu, Text, UnstyledButton} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
	faArrowRightFromBracket,
	faChevronDown,
	faFlask,
	faScrewdriverWrench,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
import {ApplicationRoles, DiscordUserDto} from '../../contexts/authentication/authenticationTypes';
import {ThemeSwitchAsMenuItem} from '../ThemeSwitch';
import {Link} from 'react-router-dom';
import {useAuth} from '../../contexts/authentication/AuthProvider';
import {useCheckAccess} from '../../contexts/authentication/useCheckAccess';
import {T} from '../T';
import {JSX} from 'react';
import cx from 'clsx';
import classes from './NavIcon.module.css';
import {useDisclosure} from '@mantine/hooks';
import {FeaturePreview} from './featurePreview/FeaturePreview';

type UserMenuProps = {
	user: DiscordUserDto;
};

export function UserMenu(props: Readonly<UserMenuProps>): JSX.Element {
	const {user} = props;
	const {logout} = useAuth();

	const [opened, {open, close}] = useDisclosure(false);

	return <>
		<FeaturePreview opened={opened} onClose={close}/>
		<Menu>
			<Menu.Target>
				<UnstyledButton className={cx(classes.wrapper_shared, classes.wrapper_flipped)}>
					<Group wrap={'nowrap'}>
						<Avatar src={user.avatarUrl}
								radius={28} size={28 /*Size and radius are intended to match NavIcon*/}/>
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

				<Menu.Divider/>

				<Menu.Item leftSection={<FontAwesomeIcon icon={faFlask}/>} onClick={open}>
					<T k={'userMenu.featurePreview'}/>
				</Menu.Item>

				{useCheckAccess(ApplicationRoles.ROLE_SYS_ADMIN) &&
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
	</>;
}
