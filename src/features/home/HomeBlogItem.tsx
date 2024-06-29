import {JSX} from 'react';
import {Card, Group, Text, Title} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbTack} from '@fortawesome/free-solid-svg-icons';

type HomeBlogItemProps = {};

export function HomeBlogItem(props: HomeBlogItemProps): JSX.Element {
	const {} = props;

	return (
		<Card withBorder>
			<Group justify={'space-between'}>
			<Title order={3}>Blog post</Title>
				<FontAwesomeIcon icon={faThumbTack}/>
			</Group>
			<Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et,
				ultricies metus.</Text>
		</Card>
	);
}
