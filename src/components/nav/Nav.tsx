import {AppShell, Box, Container, createStyles, Footer, Group, Header, MediaQuery} from "@mantine/core";
import {Logo} from '../logo/Logo';
import {faArrowRightToBracket, faCalendarDay} from '@fortawesome/free-solid-svg-icons';
import {NavIconAction, NavIconLink} from './NavIcon';
import {ThemeSwitch} from '../ThemeSwitch';
import {UserMenu} from './UserMenu';
import {useAuth} from '../../contexts/authentication/AuthProvider';
import {PageFooter} from '../PageFooter/PageFooter';

const useStyles = createStyles(() => ({
	inner: {
		height: NAV_HEIGHT,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
}));

type NavProps = {
	children: JSX.Element
};
export const NAV_HEIGHT = 100;
export const FOOTER_HEIGHT = 150;

export function Nav(props: NavProps): JSX.Element {
	const {classes} = useStyles();


	const {user, login} = useAuth();

	return (
		<AppShell
			header={
				<Header height={NAV_HEIGHT} withBorder={false}>
					<Container className={classes.inner}>
						<Logo/>
						<Box styles={{alignSelf: "flex-end"}}>
							<Group noWrap>
								<MediaQuery smallerThan={'xs'} styles={{display: 'none'}}>
									<NavIconLink link={'/events'} text={'Kalender'} icon={faCalendarDay} width={110}/>
								</MediaQuery>
								{(user) ?
									<UserMenu user={user}/>
									:
									<>
										<NavIconAction onClick={login} text={'Login'} icon={faArrowRightToBracket}
													   width={90}/>
										<ThemeSwitch/>
									</>
								}
							</Group>
						</Box>
					</Container>
				</Header>
			}
			footer={
				<Footer height={0} withBorder={false} sx={{position: 'unset'}}>
					<PageFooter/>
				</Footer>
			}
			sx={{main: {minHeight: `calc(100vh - ${FOOTER_HEIGHT}px)`}}}>
			{props.children}
		</AppShell>
	);
}
