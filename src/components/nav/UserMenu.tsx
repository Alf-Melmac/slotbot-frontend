import {Avatar, createStyles, Group, Menu, Text, UnstyledButton} from "@mantine/core";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRightFromBracket, faChevronDown, faScrewdriverWrench, faUser} from '@fortawesome/free-solid-svg-icons';
import {ApplicationRoles, DiscordUserDto} from '../../contexts/authentication/authenticationTypes';
import {ThemeSwitchAsMenuItem} from '../ThemeSwitch';
import {NAV_ICON_SIZE, NAV_ICON_WRAPPER_HEIGHT} from './NavIcon';
import {Link} from 'react-router-dom';
import {useAuth} from '../../contexts/authentication/AuthProvider';
import {underlineOnHover} from '../../contexts/CommonStylings';
import {useCheckAccess} from '../../contexts/authentication/useCheckAccess';
import {T} from '../T';

const useStyles = createStyles((theme) => ({
	user: {
		borderRadius: 1000,
		paddingLeft: 4,
		paddingRight: theme.spacing.sm,
		height: NAV_ICON_WRAPPER_HEIGHT,
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,

		...underlineOnHover,
	},
}));

type UserMenuProps = {
	user: DiscordUserDto;
};

export function UserMenu(props: UserMenuProps): JSX.Element {
	const {user} = props;
	const {classes} = useStyles();
	const {logout} = useAuth();

	const sysAdmin = useCheckAccess(ApplicationRoles.ROLE_SYS_ADMIN);

	return (
		<Menu position={'bottom-end'}>
			<Menu.Target>
				<UnstyledButton className={classes.user}>
					<Group noWrap>
						<Avatar src={user.avatarUrl} radius={NAV_ICON_SIZE} size={NAV_ICON_SIZE}/>
						<Text size="sm" weight={500}>
							{user.name}
						</Text>

						<FontAwesomeIcon icon={faChevronDown}/>
					</Group>
				</UnstyledButton>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Item icon={<FontAwesomeIcon icon={faUser}/>} component={Link} to={`/profile/${user.id}`}>
					<T k={'userMenu.myProfile'}/>
				</Menu.Item>
				<ThemeSwitchAsMenuItem/>
				<Menu.Item icon={<FontAwesomeIcon icon={faArrowRightFromBracket}/>} onClick={logout}>
					<T k={'userMenu.logout'}/>
				</Menu.Item>
				{sysAdmin &&
                    <>
                        <Menu.Label><T k={'userMenu.label.admin'}/></Menu.Label>
                        <Menu.Item icon={<FontAwesomeIcon icon={faScrewdriverWrench}/>}
                                   component={Link} to={'/admin/utils'}>
                            <T k={'userMenu.admin.utils'}/>
                        </Menu.Item>
                    </>
				}
			</Menu.Dropdown>
		</Menu>
	);
}
