import {useTranslatedDocumentTitle} from '../../hooks/useDocumentTitle';
import {Button, Card, SimpleGrid, Stack, Text, ThemeIcon, Title} from '@mantine/core';
import {T} from '../../components/T';
import {SearchControl} from './SearchControl';
import {JSX, ReactNode} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRightToBracket, faPlus} from '@fortawesome/free-solid-svg-icons';
import {faDiscord} from '@fortawesome/free-brands-svg-icons';
import {AnchorBlank} from '../../components/Text/AnchorBlank';
import {CreateGuild} from './creation/CreateGuild';
import {useAuth} from '../../contexts/authentication/AuthProvider';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {TextKey} from '../../contexts/language/Language';

export function Guilds(): JSX.Element {
	useTranslatedDocumentTitle('documentTitle.guilds');
	const {user, login} = useAuth();

	return (
		<Stack gap={'xl'} align={'center'} mt={'xl'}>
			<Stack align={'center'}>
				<Title ta={'center'}><T k={'guilds.explore.title'}/></Title>
				<Text variant={'secondary'} ta={'center'}><T k={'guilds.explore.description'}/></Text>
			</Stack>

			<SearchControl big/>

			<SimpleGrid cols={{base: 1, xs: 2}}>
				<CreateGuildCard icon={faPlus} title={'guilds.create'}
								 description={user ? 'guilds.create.description' : 'guilds.create.anonymous.description'}
								 content={user ?
									 <CreateGuild/>
									 :
									 <Button onClick={login} fullWidth
											 leftSection={<FontAwesomeIcon icon={faArrowRightToBracket}/>}>
										 <T k={'guilds.create.anonymous.button'}/>
									 </Button>}
				/>

				<CreateGuildCard icon={faDiscord} title={'guilds.create.discord'}
								 description={'guilds.create.discord.description'}
								 content={<Button component={AnchorBlank} fullWidth
				                                  leftSection={<FontAwesomeIcon icon={faDiscord}/>}
												  href={'https://slotbot.de/invite'}>
									 <T k={'integration.discord.invite'}/>
								 </Button>}
				/>
			</SimpleGrid>
		</Stack>
	);
}

type CreateGuildCardProps = {
	icon: IconDefinition;
	title: TextKey;
	description: TextKey;
	content: ReactNode;
}

function CreateGuildCard(props: Readonly<CreateGuildCardProps>): JSX.Element {
	const {icon, title, description, content} = props;

	return <Card withBorder shadow={'sm'}>
		<Stack justify={'space-between'} h={'100%'}>
			<Stack align={'center'}>
				<ThemeIcon variant={'light'} size={'xl'}>
					<FontAwesomeIcon icon={icon}/>
				</ThemeIcon>
				<Stack gap={2} align={'center'}>
					<Title order={2} ta={'center'}><T k={title}/></Title>
					<Text variant={'secondary'} ta={'center'}><T k={description}/></Text>
				</Stack>
			</Stack>
			{content}
		</Stack>
	</Card>;
}
