import {openSpotlight} from '@mantine/spotlight';
import {Group, Text, UnstyledButton} from '@mantine/core';
import {SearchKeys} from '../../components/Input/SearchKeys';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {T} from '../../components/T';
import {JSX} from 'react';
import classes from './SearchControl.module.css';

type SearchControlProps = {
	big?: boolean;
}

export function SearchControl(props: Readonly<SearchControlProps>): JSX.Element {
	const {big = false} = props;

	return (
		<UnstyledButton w={big ? '70%' : '100%'} px={big ? 'md' : 'xs'} py={big ? undefined : 3}
		                h={big ? 50 : undefined} onClick={() => openSpotlight()}
		                className={classes.root} mod={{big: big}}>
			<Group wrap={'nowrap'}>
				<FontAwesomeIcon icon={faMagnifyingGlass}/>
				<Group justify={'space-between'} className={classes.text}>
					<Text size={big ? 'lg' : 'sm'} c={'dimmed'}>
						<T k={big ? 'guilds.search' : 'search'}/>
					</Text>
					<Text ta={'right'} visibleFrom={'md'}>
						<SearchKeys/>
					</Text>
				</Group>
			</Group>
		</UnstyledButton>
	);
}
