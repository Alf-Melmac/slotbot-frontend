import {Image, Text, useMantineTheme} from '@mantine/core';
import {EventSlotlistProps} from './EventSlotlist';

type ReservedForProps = {
	guild: EventSlotlistProps['squadList'][number]['reservedFor'] | EventSlotlistProps['squadList'][number]['slotList'][number]['reservedFor']
}

/**
 * Displays optional reservation info for a squad or slot
 */
export function ReservedFor(props: ReservedForProps): JSX.Element {
	const {guild} = props;
	const theme = useMantineTheme();

	if (guild) {
		if (guild.emojiUrl) {
			return <Image src={guild.emojiUrl}
						  title={guild.groupIdentifier}
						  alt={guild.groupIdentifier}
						  placeholder={<Text align={'center'}>{guild.groupIdentifier}</Text>}
						  width={theme.fontSizes.md}/>;
		}
		return <Text>[{guild.groupIdentifier}]</Text>;
	}
	return <></>;
}
