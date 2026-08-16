import {useTranslatedDocumentTitle} from '../../hooks/useDocumentTitle';
import {Button, Card, SimpleGrid, Stack, Text, ThemeIcon, Title} from '@mantine/core';
import {T} from '../../components/T';
import {SearchControl} from './SearchControl';
import {JSX} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {faDiscord} from '@fortawesome/free-brands-svg-icons';
import {AnchorBlank} from '../../components/Text/AnchorBlank';
import {CreateGuild} from './creation/CreateGuild';

export function Guilds(): JSX.Element {
	useTranslatedDocumentTitle('documentTitle.guilds');

	return (
		<Stack gap={'xl'} align={'center'} mt={'xl'}>
			<Stack align={'center'}>
				<Title ta={'center'}><T k={'guilds.explore.title'}/></Title>
				<Text variant={'secondary'} ta={'center'}><T k={'guilds.explore.description'}/></Text>
			</Stack>

			<SearchControl big/>

			<SimpleGrid cols={{base: 1, xs: 2}}>
				<Card withBorder shadow={'sm'}>
					<Stack align={'center'}>
						<ThemeIcon variant={'light'} size={'xl'}>
							<FontAwesomeIcon icon={faPlus}/>
						</ThemeIcon>
						<Stack gap={2} align={'center'}>
							<Title order={2} ta={'center'}><T k={'guilds.create'}/></Title>
							<Text variant={'secondary'} ta={'center'}><T k={'guilds.create.description'}/></Text>
						</Stack>
						<CreateGuild/>
					</Stack>
				</Card>
				<Card withBorder shadow={'sm'}>
					<Stack justify={'space-between'} h={'100%'}>
						<Stack align={'center'}>
							<ThemeIcon variant={'light'} size={'xl'}>
								<FontAwesomeIcon icon={faDiscord}/>
							</ThemeIcon>
							<Stack gap={2} align={'center'}>
								<Title order={2} ta={'center'}><T k={'guilds.create.discord'}/></Title>
								<Text variant={'secondary'} ta={'center'}>
									<T k={'guilds.create.discord.description'}/>
								</Text>
							</Stack>
						</Stack>
						<Button component={AnchorBlank} fullWidth leftSection={<FontAwesomeIcon icon={faDiscord}/>}
								href={'https://slotbot.de/invite'}>
							<T k={'integration.discord.invite'}/>
						</Button>
					</Stack>
				</Card>
			</SimpleGrid>
		</Stack>
	);
}
