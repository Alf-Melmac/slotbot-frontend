import {
	Box,
	Button,
	Center,
	Container,
	createStyles,
	Divider,
	Group,
	MediaQuery,
	Overlay,
	Text,
	Title,
	useMantineColorScheme,
} from "@mantine/core";
import {Link} from "react-router-dom";
import {useScrollIntoView} from "@mantine/hooks";
import {SocialButtons} from "./SocialButtons";
import {Scroller} from "./Scroller";
import {PlayerRecommends} from "./PlayerRecommends";
import {KnownFromLinkCard} from "./KnownFromLinkCard";
import {StatCounter} from "./StatCounter";
import {BeforeStartChecklist} from "./BeforeStartChecklist";
import {DiscordInviteBox} from "../../components/DiscordInvite/DiscordInviteBox";
import {PageFooter} from '../../components/PageFooter';

type StartPageProps = {};

export function StartPage(props: StartPageProps): JSX.Element {
	const {} = props;
	const {colorScheme} = useMantineColorScheme();
	const dark = colorScheme === 'dark';

	/*https://preview.colorlib.com/theme/transcend/*/
	const edgeDistanceX = 110;
	const edgeDistanceY = 66;
	const useStyles = createStyles((theme) => ({
		container: {
			minHeight: '100vh',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'flex-start',
			paddingBottom: theme.spacing.xl * 6,
			zIndex: 1,
			position: 'relative',

			[theme.fn.smallerThan('sm')]: {
				paddingBottom: theme.spacing.xl * 3,
			},
		},

		title: {
			color: theme.white,
			fontSize: 60,
			fontWeight: 900,
			lineHeight: 1.1,

			[theme.fn.smallerThan('sm')]: {
				fontSize: 50,
				lineHeight: 1.2,
			},

			[theme.fn.smallerThan('xs')]: {
				fontSize: 28,
				lineHeight: 1.3,
			},
		},

		description: {
			color: theme.white,
			maxWidth: 600,
			lineHeight: '1.421',
			marginTop: '2.4rem',
			paddingLeft: '8rem',
			position: 'relative',

			[theme.fn.smallerThan('sm')]: {
				maxWidth: '100%',
				fontSize: theme.fontSizes.md,
			},

			[theme.fn.smallerThan('xs')]: {
				paddingLeft: '4rem',
			},

			"&:before": {
				content: '""',
				display: 'block',
				width: '5rem',
				height: 1,
				background: theme.fn.linearGradient(45, theme.primaryColor, theme.colors.cyan[4]),
				position: 'absolute',
				left: 6,
				top: theme.fontSizes.md,

				[theme.fn.smallerThan('sm')]: {
					top: theme.fontSizes.xs,
				},

				[theme.fn.smallerThan('xs')]: {
					width: '2rem',
				},
			},
		},

		side: {
			listStyle: 'none',
			fontSize: theme.fontSizes.xl,
			lineHeight: 1.714,
			textTransform: 'uppercase',
			letterSpacing: '0.3rem',
			margin: 0,
			transform: 'translateY(-50%)',
			position: 'absolute',
			top: '50%',
			right: 0,
			cursor: 'pointer',

			[theme.fn.smallerThan('lg')]: {
				fontSize: theme.fontSizes.lg,
			},

			'li': {
				display: 'block',
				backgroundColor: 'rgba(0, 0, 0, 0.2)',
				borderTop: '1px solid rgba(255, 255, 255, 0.05)',
				position: 'relative',

				'&:before': {
					content: '""',
					display: 'block',
					height: 6,
					width: 6,
					backgroundColor: theme.primaryColor,
					borderRadius: '50%',
					position: 'absolute',
					top: '33px',
					left: '20px',

					[theme.fn.smallerThan('lg')]: {
						top: '26px',
					},
				},

				'&:hover': {
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					borderTop: '1px solid rgba(0, 0, 0, 0.1)',
				},

				'a': {
					display: 'block',
					padding: '18px 120px 18px 40px',
					color: theme.white,

					[theme.fn.smallerThan('lg')]: {
						padding: '15px 60px 15px 40px',
					},

					'span': {
						display: 'block',
						fontSize: theme.fontSizes.lg,
						lineHeight: '1.6rem',
						color: 'rgba(255, 255, 255, 0.5)',
						textTransform: 'none',
						letterSpacing: 0,

						[theme.fn.smallerThan('lg')]: {
							fontSize: theme.fontSizes.md,
						},
					},
				},
			},
		},

		bottomLeft: {
			position: 'absolute',
			bottom: edgeDistanceY,
			left: edgeDistanceX,
		},

		bottomRight: {
			position: 'absolute',
			bottom: edgeDistanceY + 50,
			right: edgeDistanceX,
		},

		subHeading: {
			textTransform: "uppercase",
			letterSpacing: 2,
			color: 'transparent',
			background: theme.fn.linearGradient(45, theme.primaryColor, theme.colors.cyan[4]),
			backgroundClip: 'text',
			marginBottom: theme.spacing.xs,

			'&:before': {
				content: '"/ "',
			},
		},
	}));

	const {classes} = useStyles();

	const {scrollIntoView: scrollToAbout, targetRef: aboutRef} = useScrollIntoView<HTMLDivElement>({offset: 60});
	const {scrollIntoView: scrollToEvents, targetRef: eventsRef} = useScrollIntoView<HTMLDivElement>({offset: 60});
	const {scrollIntoView: scrollToDiscord, targetRef: discordRef} = useScrollIntoView<HTMLDivElement>({offset: 60});
	let scrollerAbout = () => scrollToAbout({alignment: 'start'});
	let scrollerEvents = () => scrollToEvents({alignment: 'start'});
	let scrollerDiscord = () => scrollToDiscord({alignment: 'start'});

	return (
		<>
			<header style={{
				position: 'relative',
				backgroundImage: 'url(https://cdn.discordapp.com/attachments/819969938562220053/934588485648646214/ArmA_3_Screenshot_2022.01.23_-_00.16.14.22.png)',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: "no-repeat",
				backgroundAttachment: "scroll",
			}}>
				<Overlay
					gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
					opacity={1}
					zIndex={0}
				/>
				<Container className={classes.container}>
					<Title className={classes.title}>Hallo Mitspieler, wir sind <br/> Arma macht Bock.</Title>
					<Text className={classes.description} size="xl" mt="xl">
						Dein nächster Schritt in Richtung Zeitvertreib und Gemeinschaft.
					</Text>
				</Container>

				<MediaQuery smallerThan={"md"} styles={{display: "none"}}>
					<ul className={classes.side}>
						<li><a onClick={scrollerAbout}>Über uns<span>wer wir sind</span></a></li>
						<li><a onClick={scrollerEvents}>Events<span>wann wir spielen</span></a></li>
						<li><a onClick={scrollerDiscord}>Discord<span>rede mit</span></a></li>
					</ul>
				</MediaQuery>

				<Box className={classes.bottomLeft}>
					<SocialButtons/>
				</Box>

				<MediaQuery smallerThan={"xs"} styles={{display: "none"}}>
					<Box className={classes.bottomRight}>
						<Scroller onClick={scrollerAbout}/>
					</Box>
				</MediaQuery>
			</header>

			<Box ref={aboutRef} py={180}>
				<Container>
					<Title order={3} className={classes.subHeading}>Über uns</Title>
					<Title order={1} mb={'lg'}>Arma 3? Das ist unser Ding.</Title>
					<Text size={'lg'}>
						Aber nicht nur das. Seit Mitte 2020 zocken wir gemeinsam, einfach weil es Spaß macht.<br/>
						Jeder kennt die Sozialstunden bei der Familie und die Verpflichtungen die eingegangen werden
						müssen. Wer danach, davor oder auch dabei abschalten oder auch mal wieder den Rechner anschreien
						möchte, ist bei uns Willkommen.<br/>
						Einen eigenen Discord, Teamspeak und leistungsstarker Game-Server (man muss ja auch mal ein
						bisschen angeben ;)) bieten wir im Gegenzug zu einem ausgewogenen Spielerlebnis mit der
						richtigen Menge Realismus und Spaß.
					</Text>
					<Text size={'lg'}>
						Egal ob dein Interesse nun geweckt ist, oder wir dich erst noch überzeugen müssen, <a
						onClick={scrollerEvents}>besuch uns einfach mal</a> und wir spielen,
						plaudern und finden zueinander. (Still a better lovestory than Twilight)
					</Text>
				</Container>
			</Box>

			<Box ref={eventsRef} py={180} style={{
				position: 'relative',
				backgroundImage: 'url(https://cdn.discordapp.com/attachments/798864031246581760/949790943580667944/20220305230611_1.jpg)',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: "no-repeat",
				backgroundAttachment: "scroll",
			}}>
				<Overlay
					gradient="linear-gradient(180deg, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, .65) 40%)"
					opacity={1}
					zIndex={0}
				/>
				<Container style={{zIndex: 1, position: "relative"}}>
					<Title order={3} className={classes.subHeading}>Wann gehts los?</Title>
					<Text size={'lg'} mb={'lg'}>
						Üblicherweise planen wir unsere abendlichen Zusammentreffen im Voraus. Schaue doch einfach mal
						in unseren Eventkalender und sei beim Nächsten dabei.<br/>
					</Text>
					<Text size={'lg'} mb={'lg'} style={{display: 'none'}}>
						Den Eventkalender könnt ihr übrigens auch direkt bei euch einbinden. Schaut dazu mal <a
						href="https://docs.webalf.de">hier</a> vorbei.
					</Text>

					<Center>
						<Button variant="gradient" size="xl" radius="xl" mt={'xl'} component={Link} to="/events">
							Events
						</Button>
					</Center>
				</Container>
			</Box>

			<Container py={180}>
				<Title order={3} className={classes.subHeading}>Das sagen unsere Spieler</Title>
				<PlayerRecommends/>
			</Container>

			<Box py={180} style={{
				position: 'relative',
				backgroundImage: 'url(https://cdn.discordapp.com/attachments/798864031246581760/949790915034226718/20220305224910_1.jpg)',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: "no-repeat",
				backgroundAttachment: "scroll",
			}}>
				<Container>
					<Title order={3} className={classes.subHeading}>Auch bekannt durch</Title>
					<Group spacing={'xl'} position={'center'} m={'xl'}>
						<KnownFromLinkCard link={"https://deutsche-arma-allianz.de"}
										   image={'assets/1024-1024_DAA_trans.png'}
										   title={"Deutsche Arma Allianz"}
										   author={"Größte Zusammenschluss deutschsprachiger Arma 3 Gruppen"}/>
						<KnownFromLinkCard link={"https://forum.nato-taskforce.com"}
										   image={"https://cloud.nato-taskforce.com/apps/files_sharing/publicpreview/efeAyPHpkwpepJw?x=2552&y=965&a=true&file=NTF_Logo4k.png&scalingup=0"}
										   title={"Nato Task Force"} author={"Partnerclan"}/>
					</Group>

					<Divider/>

					<Group grow mt={'xl'}>
						<StatCounter countEnd={129} info={"Events in den letzten 356 Tagen"}/>
						<StatCounter countEnd={2025} info={"Belegte Slots in den letzten 356 Tagen"}/>
					</Group>
				</Container>
			</Box>

			<Box py={180}>
				<Center>
					<BeforeStartChecklist/>
				</Center>
			</Box>

			<Box ref={discordRef} py={180} style={{
				position: 'relative',
				backgroundImage: 'url(https://cdn.discordapp.com/attachments/819969938562220053/934212375383511080/20220121222728_1.jpg)',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: "no-repeat",
				backgroundAttachment: "scroll",
			}}>
				<Center>
					<DiscordInviteBox inviteCode={'zMwnQgQ'}/>
				</Center>
			</Box>

			<PageFooter/>
		</>
	);
}
