import {AppShell, AppShellProps, Container, Group} from '@mantine/core';
import {Logo} from '../logo/Logo';
import {faArrowRightToBracket, faCalendarDay, faUsers} from '@fortawesome/free-solid-svg-icons';
import {NavIconAction, NavIconLink} from './NavIcon';
import {ThemeSwitch} from '../ThemeSwitch';
import {UserMenu} from './UserMenu';
import {useAuth} from '../../contexts/authentication/AuthProvider';
import {PageFooter} from '../PageFooter/PageFooter';
import {useFavicon} from '@mantine/hooks';
import ambFavicon from './favicon/favicon-amb.ico';
import daaFavicon from './favicon/favicon-daa.ico';
import tttFavicon from './favicon/favicon-ttt.ico';
import {getGuild, Guild} from '../../contexts/theme/Theme';
import {JSX, PropsWithChildren} from 'react';
import classes from './Nav.module.css';

type NavProps = {
	navbar?: JSX.Element;
	navbarProps?: AppShellProps['navbar'];
};
export const NAV_HEIGHT = 80; /*Remember to also update classes.headerInner#height*/

export function Nav(props: Readonly<PropsWithChildren<NavProps>>): JSX.Element {
	const guild = getGuild();
	let favicon;
	if (guild === Guild.AMB) {
		favicon = ambFavicon;
	} else if (guild === Guild.DAA) {
		favicon = daaFavicon;
	} else if (guild === Guild.TTT) {
		favicon = tttFavicon;
	}
	favicon && useFavicon(favicon);

	const {user, login} = useAuth();

	return (
		<AppShell
			header={{height: NAV_HEIGHT}}
			navbar={props.navbarProps}
			layout={'alt'}
			classNames={{main: classes.main, footer: classes.footer}}
		>
			<AppShell.Header withBorder={false}>
				<Container className={classes.headerInner}>
					<Logo/>
					<Group wrap={'nowrap'} gap={'xs'}>
						<NavIconLink link={'/guilds'} text={'nav.guilds'} icon={faUsers}
									 width={135} visibleFrom={'xs'}/>
						<NavIconLink link={'/events'} text={'nav.calendar'} icon={faCalendarDay}
									 width={110} visibleFrom={'xs'}/>
						{(user) ?
							<UserMenu user={user}/>
							:
							<>
								<NavIconAction onClick={login} text={'nav.login'} icon={faArrowRightToBracket} width={90}/>
								<ThemeSwitch/>
							</>
						}
					</Group>
				</Container>
			</AppShell.Header>

			{props.navbar}

			<AppShell.Main>
				{props.children}
			</AppShell.Main>

			<AppShell.Footer withBorder={false}>
				<PageFooter/>
			</AppShell.Footer>
		</AppShell>
	);
}
