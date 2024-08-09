import {Avatar, Group, Menu, Text, UnstyledButton, useMantineTheme} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
	faArrowRightFromBracket,
	faCaretRight,
	faChevronDown,
	faChevronLeft,
	faFlask,
	faLanguage,
	faScrewdriverWrench,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
import {ApplicationRoles, DiscordUserDto} from '../../contexts/authentication/authenticationTypes';
import {ThemeSwitchAsMenuItem} from '../ThemeSwitch';
import {Link} from 'react-router-dom';
import {useAuth} from '../../contexts/authentication/AuthProvider';
import {useCheckAccess} from '../../contexts/authentication/useCheckAccess';
import {T} from '../T';
import {Dispatch, JSX, SetStateAction, useState} from 'react';
import cx from 'clsx';
import classes from './NavIcon.module.css';
import {useDisclosure} from '@mantine/hooks';
import {FeaturePreview} from './featurePreview/FeaturePreview';
import {useLanguage} from '../../contexts/language/Language';

type UserMenuProps = {
	user: DiscordUserDto;
};

export function UserMenu(props: Readonly<UserMenuProps>): JSX.Element {
	const {user} = props;

	const [featurePreviewOpened, {open: openFeaturePreview, close: closeFeaturePreview}] = useDisclosure(false);
	const [showLanguageMenu, setShowLanguageMenu] = useState(false);

	return <>
		<FeaturePreview opened={featurePreviewOpened} onClose={closeFeaturePreview}/>
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
				{!showLanguageMenu ?
					<MainMenu {...props} setShowLanguageMenu={setShowLanguageMenu}
							  openFeaturePreview={openFeaturePreview}/>
					:
					<LanguageMenu setShowLanguageMenu={setShowLanguageMenu}/>
				}
			</Menu.Dropdown>
		</Menu>
	</>;
}

type MainMenuProps = UserMenuProps & {
	setShowLanguageMenu: Dispatch<SetStateAction<boolean>>,
	openFeaturePreview: () => void
};

function MainMenu({user, setShowLanguageMenu, openFeaturePreview}: Readonly<MainMenuProps>): JSX.Element {
	const {logout} = useAuth();

	return <>
		<Menu.Item leftSection={<FontAwesomeIcon icon={faUser}/>} component={Link} to={`/profile/${user.id}`}>
			<T k={'userMenu.myProfile'}/>
		</Menu.Item>
		<ThemeSwitchAsMenuItem/>
		<Menu.Item leftSection={<FontAwesomeIcon icon={faLanguage}/>}
				   rightSection={<FontAwesomeIcon icon={faCaretRight}/>}
				   onClick={() => setShowLanguageMenu(true)}
				   closeMenuOnClick={false}>
			<T k={'userMenu.selectLanguage'}/>
		</Menu.Item>
		<Menu.Item leftSection={<FontAwesomeIcon icon={faArrowRightFromBracket}/>} onClick={logout}>
			<T k={'userMenu.logout'}/>
		</Menu.Item>

		<Menu.Divider/>

		<Menu.Item leftSection={<FontAwesomeIcon icon={faFlask}/>} onClick={openFeaturePreview}>
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
	</>;
}

function LanguageMenu({setShowLanguageMenu}: Readonly<Pick<MainMenuProps, 'setShowLanguageMenu'>>): JSX.Element {
	const {language, setLanguage} = useLanguage();
	const theme = useMantineTheme();

	const closeLanguageMenu = () => setShowLanguageMenu(false);
	return <>
		<Menu.Item leftSection={<FontAwesomeIcon icon={faChevronLeft}/>}
				   onClick={closeLanguageMenu}
				   closeMenuOnClick={false}>
			<T k={'userMenu.selectLanguage'}/>
		</Menu.Item>
		<Menu.Divider/>
		<Menu.Item color={language === 'de' ? theme.primaryColor : undefined} onClick={() => {
			setLanguage('de');
			closeLanguageMenu();
		}}>
			<T k={'language.german'}/>
		</Menu.Item>
		<Menu.Item color={language === 'en' ? theme.primaryColor : undefined} onClick={() => {
			setLanguage('en');
			closeLanguageMenu();
		}}>
			<T k={'language.english'}/>
		</Menu.Item>
	</>;
}
