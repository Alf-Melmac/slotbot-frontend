import {AppShell, AppShellProps, Container, Group, rem} from '@mantine/core';
import {Logo} from '../logo/Logo';
import {faArrowRightToBracket, faCalendarDay, faUsers} from '@fortawesome/free-solid-svg-icons';
import {NavIconAction, NavIconLink} from './NavIcon';
import {UserMenu} from './UserMenu';
import {useAuth} from '../../contexts/authentication/AuthProvider';
import {PageFooter} from '../PageFooter/PageFooter';
import {useFavicon} from '@mantine/hooks';
import ambFavicon from './favicon/favicon-amb.ico';
import daaFavicon from './favicon/favicon-daa.ico';
import tttFavicon from './favicon/favicon-ttt.ico';
import gtoFavicon from './favicon/favicon-gto.ico';
import {Guild, useGetGuild, useGuildContext} from '../../contexts/guildcontext/GuildContext';
import {JSX, PropsWithChildren, useEffect, useRef, useState} from 'react';
import classes from './Nav.module.css';
import {NavMenu} from './NavMenu';

type NavProps = {
	navbar?: JSX.Element;
	navbarProps?: AppShellProps['navbar'];
};
export const NAV_HEIGHT = 80;
const STANDARD_FOOTER_HEIGHT = 145;

export function Nav(props: Readonly<PropsWithChildren<NavProps>>): JSX.Element {
	const guild = useGetGuild();
	let favicon;
	if (guild === Guild.AMB) {
		favicon = ambFavicon;
	} else if (guild === Guild.DAA) {
		favicon = daaFavicon;
	} else if (guild === Guild.TTT) {
		favicon = tttFavicon;
	} else if (guild === Guild.GTO) {
		favicon = gtoFavicon;
	}
	favicon && useFavicon(favicon);

	const {user, login} = useAuth();
	const {guildUrlPath} = useGuildContext();

	const [footerHeight, setFooterHeight] = useState(STANDARD_FOOTER_HEIGHT);
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (!ref.current) return;
		const resizeObserver = new ResizeObserver(() => {
			setFooterHeight(ref.current?.clientHeight ?? STANDARD_FOOTER_HEIGHT);
		});
		resizeObserver.observe(ref.current);
		return () => resizeObserver.disconnect();
	}, []);

	return (
		<AppShell
			header={{height: NAV_HEIGHT}}
			navbar={props.navbarProps}
			layout={'alt'}
			classNames={{main: classes.main, footer: classes.footer}}
		>
			<AppShell.Header withBorder={false}>
				<Container style={{'--nav-height': rem(NAV_HEIGHT)}} className={classes.headerInner}>
					<Logo/>
					<Group wrap={'nowrap'} gap={'xs'}>
						<NavIconLink link={'/guilds'} text={'nav.guilds'} icon={faUsers}
									 width={135} visibleFrom={'xs'}/>
						<NavIconLink link={`/events/calendar${guildUrlPath}`} text={'nav.calendar'} icon={faCalendarDay}
									 width={110} visibleFrom={'xs'}/>
						{user ?
							<UserMenu user={user}/>
							:
							<NavIconAction onClick={login} text={'nav.login'} icon={faArrowRightToBracket} width={90}/>
						}

						<NavMenu/>
					</Group>
				</Container>
			</AppShell.Header>

			{props.navbar}

			<AppShell.Main style={{'--footer-height': `${footerHeight}px`}}>
				{props.children}
			</AppShell.Main>

			<AppShell.Footer withBorder={false} ref={ref}>
				<PageFooter/>
			</AppShell.Footer>
		</AppShell>
	);
}
