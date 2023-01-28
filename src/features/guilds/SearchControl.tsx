import {openSpotlight} from '@mantine/spotlight';
import {createStyles, Group, MediaQuery, Text, UnstyledButton} from '@mantine/core';
import {SearchKeys} from '../../components/Input/SearchKeys';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {T} from '../../components/T';

const useStyles = createStyles((theme, big: boolean) => ({
	root: {
		borderRadius: big ? theme.radius.xl : theme.radius.sm,
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
		border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,

		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
		},
	},
}));

type SearchControlProps = {
	big?: boolean;
}

export function SearchControl(props: SearchControlProps): JSX.Element {
	const {big = false} = props;
	const {classes} = useStyles(big);

	return (
		<UnstyledButton w={big ? '70%' : '100%'} px={big ? 'md' : 'xs'} py={big ? undefined : 3} h={big ? 50 : undefined}
						className={classes.root} onClick={() => openSpotlight()}>
			<Group noWrap>
				<FontAwesomeIcon icon={faMagnifyingGlass}/>
				<Group position={'apart'} sx={{flexGrow: 1}}>
					<Text size={big ? 'lg' : 'sm'} color={"dimmed"}>
						<T k={big ? 'guilds.search' : 'search'}/>
					</Text>
					<MediaQuery smallerThan={'md'} styles={{display: 'none'}}>
						<Text align={'right'}>
							<SearchKeys/>
						</Text>
					</MediaQuery>
				</Group>
			</Group>
		</UnstyledButton>
	);
}
