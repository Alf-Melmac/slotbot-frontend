import {Dispatch, JSX, SetStateAction, useState} from 'react';
import {useDisclosure} from '@mantine/hooks';
import {Burger, Menu, useMantineTheme} from '@mantine/core';
import {T} from '../T';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
	faCalendarDay,
	faCaretRight,
	faChevronLeft,
	faCodeCommit,
	faGavel,
	faLanguage,
	faScrewdriverWrench,
	faUsers,
} from '@fortawesome/free-solid-svg-icons';
import {ThemeSwitchAsMenuItem} from '../ThemeSwitch';
import {useLanguage} from '../../contexts/language/Language';
import {useCheckAccess} from '../../contexts/authentication/useCheckAccess';
import {ApplicationRoles} from '../../contexts/authentication/authenticationTypes';
import {Link} from 'react-router';
import {AnchorBlank} from '../Text/AnchorBlank';
import {faCopyright} from '@fortawesome/free-regular-svg-icons';
import {PUBLISHER} from '../PageFooter/PageFooter';

export function NavMenu(): JSX.Element {
	const {t} = useLanguage();
	const [opened, {toggle}] = useDisclosure();
	const [showLanguageMenu, setShowLanguageMenu] = useState(false);

	return <Menu opened={opened} onChange={toggle}>
		<Menu.Target>
			<Burger opened={opened} onClick={toggle} aria-label={t('nav.menu.aria')}/>
		</Menu.Target>
		<Menu.Dropdown>
			{showLanguageMenu ?
				<LanguageMenu setShowLanguageMenu={setShowLanguageMenu}/>
				:
				<MainMenu setShowLanguageMenu={setShowLanguageMenu}/>
			}
		</Menu.Dropdown>
	</Menu>;
}

function MainMenu({setShowLanguageMenu}: Readonly<LanguageMenuProps>): JSX.Element {
	return <>
		<Menu.Item leftSection={<FontAwesomeIcon icon={faCalendarDay}/>} hiddenFrom={'xs'}>
			<T k={'nav.calendar'}/>
		</Menu.Item>
		<Menu.Item leftSection={<FontAwesomeIcon icon={faUsers}/>} hiddenFrom={'xs'}>
			<T k={'nav.guilds'}/>
		</Menu.Item>

		<Menu.Divider hiddenFrom={'xs'}/>

		<ThemeSwitchAsMenuItem/>
		<Menu.Item leftSection={<FontAwesomeIcon icon={faLanguage}/>}
				   rightSection={<FontAwesomeIcon icon={faCaretRight} size={'sm'} widthAuto/>}
				   onClick={() => setShowLanguageMenu(true)}
				   closeMenuOnClick={false}>
			<T k={'userMenu.selectLanguage'}/>
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

		<Menu.Label maw={188} fz={'xs'} hiddenFrom={'xs'}>
			<FontAwesomeIcon icon={faCopyright} size={'sm'}/> <T k={'footer.author'}/><br/>
			<FontAwesomeIcon icon={faCodeCommit} size={'sm'}/> {APP_VERSION}<br/>
			<FontAwesomeIcon icon={faGavel} size={'sm'}/> <AnchorBlank href={PUBLISHER} size={'xs'}>
			<T k={'footer.legal'}/>
		</AnchorBlank>
		</Menu.Label>
	</>;
}

type LanguageMenuProps = {
	setShowLanguageMenu: Dispatch<SetStateAction<boolean>>
}

function LanguageMenu({setShowLanguageMenu}: Readonly<LanguageMenuProps>): JSX.Element {
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
