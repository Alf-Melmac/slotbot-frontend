import {Avatar, Group, Menu, Text, UnstyledButton} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRightFromBracket, faChevronDown, faFlask, faUser} from '@fortawesome/free-solid-svg-icons';
import {DiscordUserDto} from '../../contexts/authentication/authenticationTypes';
import {Link} from 'react-router';
import {useAuth} from '../../contexts/authentication/AuthProvider';
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

	const [featurePreviewOpened, {open: openFeaturePreview, close: closeFeaturePreview}] = useDisclosure(false);

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

						<FontAwesomeIcon icon={faChevronDown} widthAuto/>
					</Group>
				</UnstyledButton>
			</Menu.Target>
			<Menu.Dropdown>
				<MainMenu {...props} openFeaturePreview={openFeaturePreview}/>
			</Menu.Dropdown>
		</Menu>
	</>;
}

type MainMenuProps = UserMenuProps & {
	openFeaturePreview: () => void
};

function MainMenu({user, openFeaturePreview}: Readonly<MainMenuProps>): JSX.Element {
	const {logout} = useAuth();

	return <>
		<Menu.Item leftSection={<FontAwesomeIcon icon={faUser}/>} component={Link} to={`/profile/${user.id}`}>
			<T k={'userMenu.myProfile'}/>
		</Menu.Item>
		<Menu.Item leftSection={<FontAwesomeIcon icon={faArrowRightFromBracket}/>} onClick={logout}>
			<T k={'userMenu.logout'}/>
		</Menu.Item>

		<Menu.Divider/>

		<Menu.Item leftSection={<FontAwesomeIcon icon={faFlask}/>} onClick={openFeaturePreview}>
			<T k={'userMenu.featurePreview'}/>
		</Menu.Item>
	</>;
}
