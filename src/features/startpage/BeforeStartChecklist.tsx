import {Text} from "@mantine/core";
import {AnchorBlank} from "../../components/Text/AnchorBlank";
import {Bold} from "../../components/Text/Bold";
import {Italic} from "../../components/Text/Italic";
import {StepperChecklist} from "../../components/StepperChecklist";

export function BeforeStartChecklist(): JSX.Element {
	const steps = [
		{
			label: <Bold>
				<AnchorBlank href={'https://discordapp.com/invite/zMwnQga'}>Discord</AnchorBlank> beitreten
			</Bold>,
			description: <Text>Zentraler Dreh- und Angelpunkt</Text>,
		},
		{
			label: <Bold>
				<AnchorBlank
					href={'https://wiki.armamachtbock.de/de/Spieler/Mitmachen/Modset'}>Modset</AnchorBlank> herunterladen
			</Bold>,
			description: <Text>Die richtige Version findest du in jeder
				Event-Beschreibung.</Text>,
		},
		{
			label: <Text>Rolle auswählen</Text>,
			description: <Text>Arma (bzw. passendes Spiel)-<Bold>Rolle</Bold> im <AnchorBlank
				href={'discord://discord.com/channels/706254758721224707/739903690583834665'}>#roles-rollen
			</AnchorBlank> Kanal <Bold>auswählen</Bold>. <Italic>Über diese Rollen könnt ihr auch Mitspieler suchen.
			</Italic></Text>,
		},
		{
			label: <Bold>Anmelden</Bold>,
			description: <Text>Dazu im entsprechenden Discord Kanal '/slot &#123;Slotnummer&#125;' schreiben. <Italic>
				Hier findest du auch die wichtigsten Informationen was gespielt wird, unter anderem auch das Modpack.
			</Italic></Text>,
		},
		{
			label: <Bold>Mitspielen</Bold>,
			description: <Text>Zum Eventzeitpunkt da sein und Spaß haben. Gerne machen wir vorher gemeinsam einen
				Techcheck oder klären noch offene Fragen. <Bold>Sprich uns einfach an!</Bold></Text>,
		},
	];

	return (
		<StepperChecklist steps={steps}/>
	);
}
