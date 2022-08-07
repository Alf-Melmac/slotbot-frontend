import {AppShell, Box, Container, createStyles, Group, Header} from "@mantine/core";
import {useViewportSize} from "@mantine/hooks";
import {AmbLogo} from '../logo/AmbLogo';
import {faArrowRightToBracket, faCalendarDay} from '@fortawesome/free-solid-svg-icons';
import {NavIconAction, NavIconLink} from './NavIcon';
import {ThemeSwitch} from '../ThemeSwitch';
import {UserMenu} from './UserMenu';
import {useAuth} from '../../features/user/AuthProvider';

const useStyles = createStyles((theme) => ({
	outer: {
		borderBottom: 0,
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1],
	},

	inner: {
		height: NAV_HEIGHT,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	login: {
		color: theme.primaryColor,
	},
}));

type NavProps = {
	children: JSX.Element
};
export const NAV_HEIGHT = 100;

export function Nav(props: NavProps): JSX.Element {
	const {classes} = useStyles();

	const {height} = useViewportSize();

	const auth = useAuth();

	return (
		<AppShell
			header={
				<Header height={NAV_HEIGHT} className={classes.outer}>
					<Container className={classes.inner}>
						<AmbLogo/>
						<Box styles={{alignSelf: "flex-end"}}>
							<Group noWrap>
								<NavIconLink link={'/events'} text={'Kalender'} icon={faCalendarDay} width={110}/>
								{(auth.user) ?
									<UserMenu user={auth.user}/>
									:
									<>
										<NavIconAction onClick={auth.login} text={'Login'} icon={faArrowRightToBracket}
													   width={90}/>
										<ThemeSwitch/>
									</>
								}
							</Group>
						</Box>
					</Container>
				</Header>
			}
			padding={0}
			styles={(theme) => ({
				main: {
					backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1],
				},
			})}>
			<Box sx={{minHeight: height - 132}}>{props.children}</Box>
		</AppShell>
	);
}
