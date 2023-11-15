import {ActionIcon, Image, Text, useMantineTheme} from '@mantine/core';
import {EventSlotlistProps} from './EventSlotlist';
import {Link} from 'react-router-dom';
import {JSX} from 'react';

type ReservedForProps = {
	guild: EventSlotlistProps['squadList'][number]['reservedFor'] | EventSlotlistProps['squadList'][number]['slotList'][number]['reservedFor']
}

/**
 * Displays optional reservation info for a squad or slot
 */
export function ReservedFor(props: Readonly<ReservedForProps>): JSX.Element {
	const {guild} = props;
	const theme = useMantineTheme();

	if (guild) {
		return <ActionIcon variant={'transparent'} component={Link} to={`/guilds/${guild.id}`}
						   title={guild.groupIdentifier} w={'auto'}>
			{guild.emojiUrl ?
				<Image src={guild.emojiUrl}
					   alt={guild.groupIdentifier}
					   placeholder={<Text align={'center'}>{guild.groupIdentifier}</Text>}
					   width={theme.fontSizes.lg}/>
				:
				<Text>[{guild.groupIdentifier}]</Text>
			}
		</ActionIcon>;
	}
	return <></>;
}
