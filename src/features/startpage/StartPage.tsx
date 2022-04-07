import {
	Anchor,
	Button,
	Center,
	Container,
	createStyles,
	Divider,
	Group,
	Overlay,
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
import daaLogo from './1024-1024_DAA_trans.png';
import {Section} from './Section';
import {StartPageHeader} from './StartPageHeader';

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

			<Section boxRef={eventsRef}
					 backgroundImage={'https://cdn.discordapp.com/attachments/798864031246581760/949790943580667944/20220305230611_1.jpg'}>
				<Overlay
					gradient="linear-gradient(180deg, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, .65) 40%)"
					opacity={1}
					zIndex={0}
				/>
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

			<Section
				backgroundImage={'https://cdn.discordapp.com/attachments/798864031246581760/949790915034226718/20220305224910_1.jpg'}>
				<Container>
					<Title order={3} className={classes.subHeading}>Auch bekannt durch</Title>
					<Group spacing={'xl'} position={'center'} m={'xl'}>
						<KnownFromLinkCard link={"https://deutsche-arma-allianz.de"}
										   image={daaLogo}
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
			</Section>

			<Section>
				<Center>
					<BeforeStartChecklist/>
				</Center>
			</Section>

			{/*boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05),rgba(0, 0, 0, 0.05) 0px 36px 28px -7px,rgba(0, 0, 0, 0.04) 0px 17px 17px -7px',*/}
			<Section boxRef={discordRef}
					 backgroundImage={'https://cdn.discordapp.com/attachments/819969938562220053/934212375383511080/20220121222728_1.jpg'}>
				<Center>
					<DiscordInviteBox inviteCode={'zMwnQgQ'}/>
				</Center>
			</Section>

			<PageFooter/>
		</>
	);
}
