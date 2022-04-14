import {
	Anchor,
	Button,
	Center,
	Container,
	createStyles,
	Divider,
	Group,
	Text,
	Title,
	useMantineColorScheme,
} from "@mantine/core";
import {Link} from "react-router-dom";
import {useScrollIntoView} from "@mantine/hooks";
import {PlayerRecommends} from "./PlayerRecommends";
import {KnownFromLinkCard} from "./KnownFromLinkCard";
import {StatCounter} from "./StatCounter";
import {BeforeStartChecklist} from "./BeforeStartChecklist";
import {DiscordInviteBox} from "../../components/DiscordInvite/DiscordInviteBox";
import {PageFooter} from '../../components/PageFooter/PageFooter';
import {Section} from './Section';
import {StartPageHeader} from './StartPageHeader';
import {StartPageImageOverlay} from './StartPageImageOverlay';
import eventsBackground from './images/eventsBackground.jpg';
import knownFromBackground from './images/knownFromBackground.jpg';
import daaLogo from './images/280-280_DAA_trans.png';
import ntfLogo from './images/260-320_NTF_trans.png';
import discordBackgroundDark from './images/discordBackgroundDark.jpg';
import discordBackgroundLight from './images/discordBackgroundLight.jpg';

export function StartPage(): JSX.Element {
	const {colorScheme} = useMantineColorScheme();
	const dark = colorScheme === 'dark';

	const useStyles = createStyles((theme) => ({
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

		textWithBackgroundImage: {
			color: dark ? theme.colors.dark[0] : theme.colors.gray[0],
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
			<StartPageHeader scrollerAbout={scrollerAbout} scrollerEvents={scrollerEvents}
							 scrollerDiscord={scrollerDiscord}/>

			<Section boxRef={aboutRef}>
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
						Egal ob dein Interesse nun geweckt ist, oder wir dich erst noch überzeugen müssen, <Anchor
						size={'lg'} onClick={scrollerDiscord}>besuch uns einfach mal</Anchor> und wir spielen,
						plaudern und finden zueinander. (Still a better lovestory than Twilight)
					</Text>
				</Container>
			</Section>

			<Section boxRef={eventsRef} backgroundImage={eventsBackground}>
				<StartPageImageOverlay opacity={dark ? 1 : .75}/>
				<Container style={{zIndex: 1, position: "relative"}}>
					<Title order={3} className={classes.subHeading}>Wann gehts los?</Title>
					<Text size={'lg'} mb={'lg'} className={classes.textWithBackgroundImage}>
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
			</Section>

			<Container py={180}>
				<Title order={3} className={classes.subHeading}>Das sagen unsere Spieler</Title>
				<PlayerRecommends/>
			</Container>

			<Section backgroundImage={knownFromBackground}>
				<StartPageImageOverlay opacity={0.5}/>
				<Container style={{zIndex: 1, position: "relative"}}>
					<Title order={3} className={classes.subHeading}>Auch bekannt durch</Title>
					<Group spacing={'xl'} position={'center'} m={'xl'}>
						<KnownFromLinkCard link={"https://deutsche-arma-allianz.de"}
										   image={daaLogo}
										   title={"Deutsche Arma Allianz"}
										   description={"Größte Zusammenschluss deutschsprachiger Arma 3 Gruppen"}/>
						<KnownFromLinkCard link={"https://forum.nato-taskforce.com"}
										   image={ntfLogo}
										   title={"Nato Task Force"} description={"Partnerclan"}/>
					</Group>

					<Divider/>

					<Group grow mt={'xl'}>
						<StatCounter countEnd={198} info={"Events in den letzten 365 Tagen"}/>
						<StatCounter countEnd={2059} info={"Belegte Slots in den letzten 365 Tagen"}/>
					</Group>
				</Container>
			</Section>

			<Section>
				<Center>
					<BeforeStartChecklist/>
				</Center>
			</Section>

			<Section boxRef={discordRef} backgroundImage={dark ? discordBackgroundDark : discordBackgroundLight}>
				<Center>
					<DiscordInviteBox inviteCode={'zMwnQgQ'}/>
				</Center>
			</Section>

			<PageFooter/>
		</>
	);
}
