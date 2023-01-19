import {useTranslatedDocumentTitle} from '../../hooks/useTranslatedDocumentTitle';
import {Stack, TextInput, Title} from '@mantine/core';
import {SEARCH_KEYS_WIDTH_ROUND, SearchKeys} from '../../components/Input/SearchKeys';
import {T} from '../../components/T';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {useLanguage} from '../../contexts/language/Language';
import {GuildsPage} from './GuildsPage';

export function Guilds(): JSX.Element {
	useTranslatedDocumentTitle('documentTitle.guilds');
	const {t} = useLanguage();

	return (
		<GuildsPage>
			<Stack spacing={'xl'} align={'center'} mt={'xl'}>
				<Title><T k={'guilds'}/></Title>

				<TextInput
					icon={<FontAwesomeIcon icon={faMagnifyingGlass}/>}
					radius={"xl"}
					size={"lg"}
					placeholder={t('guilds.search')}
					w={'70%'}
					rightSection={<SearchKeys/>}
					rightSectionWidth={SEARCH_KEYS_WIDTH_ROUND}
				/>
			</Stack>
		</GuildsPage>
	);
}
