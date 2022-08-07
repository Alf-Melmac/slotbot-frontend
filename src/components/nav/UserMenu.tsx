import {Avatar, createStyles, Group, Menu, Text, UnstyledButton} from "@mantine/core";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRightFromBracket, faChevronDown, faUser} from '@fortawesome/free-solid-svg-icons';
import {DiscordUserDto} from '../../features/user/authenticationTypes';
import {ThemeSwitchAsMenuItem} from '../ThemeSwitch';
import {NAV_ICON_SIZE, NAV_ICON_WRAPPER_HEIGHT} from './NavIcon';
import {Link} from 'react-router-dom';
import {useAuth} from '../../features/user/AuthProvider';
import {underlineOnHover} from '../../contexts/CommonStylings';

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
	const auth = useAuth();

	return (
		<Menu position={'bottom-end'}>
			<Menu.Target>
				<UnstyledButton className={classes.user}>
					<Group>
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
					Mein Profil
				</Menu.Item>
				<ThemeSwitchAsMenuItem/>
				<Menu.Item icon={<FontAwesomeIcon icon={faArrowRightFromBracket}/>} onClick={auth.logout}>
					Logout
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}
