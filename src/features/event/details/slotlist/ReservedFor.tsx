import {ActionIcon, Image, Text, Tooltip, useMantineTheme} from '@mantine/core';
import {EventSlotlistProps} from './EventSlotlist';
import {Link} from 'react-router';
import {JSX} from 'react';

type ReservedForProps = {
	guild: EventSlotlistProps['squadList'][number]['reservedFor'] | EventSlotlistProps['squadList'][number]['slotList'][number]['reservedFor'];
}

/**
 * Displays optional reservation info for a squad or slot
 */
export function ReservedFor(props: Readonly<ReservedForProps>): JSX.Element {
	const {guild} = props;
	const theme = useMantineTheme();

	if (!guild) return <></>;

	return <Tooltip label={guild.groupIdentifier} withArrow>
		<ActionIcon color={'gray'} variant={'subtle'} component={Link} to={`/guilds/${guild.id}`}
					title={guild.groupIdentifier} w={'auto'}>
			{guild.emojiUrl ?
				<Image src={guild.emojiUrl} w={theme.fontSizes.lg}/>
				:
				<Text mx={4}>[{guild.groupIdentifier}]</Text>
			}
		</ActionIcon>
	</Tooltip>;
}
