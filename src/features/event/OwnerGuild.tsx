import {JSX} from 'react';
import {GuildDto} from '../guilds/guildTypes';
import {ActionIcon, Group, Image, Text, TextProps, useMantineTheme} from '@mantine/core';
import {Link} from 'react-router';

type OwnerGuildProps = {
	/**
	 * Guild to display
	 */
	guild: GuildDto;
	/**
	 * Whether to render the guild as a link to the guild page
	 * @default true
	 */
	link?: boolean;
	/**
	 * Size of the text and image
	 */
	size?: TextProps['size'];
};

export function OwnerGuild({guild, link = true, size}: Readonly<OwnerGuildProps>): JSX.Element {
	const theme = useMantineTheme();

	return link ?
		<ActionIcon color={theme.colors.dark[0]} variant={'subtle'} component={Link} to={`/guilds/${guild.id}`}
					w={'auto'}
					size={size}>
			<OwnerGuildContent guild={guild} size={size}/>
		</ActionIcon>
		:
		<Text c={theme.black} size={size}>
			<OwnerGuildContent guild={guild} size={size}/>
		</Text>;
}

type OwnerGuildContentProps = Pick<OwnerGuildProps, 'guild' | 'size'>

function OwnerGuildContent({guild: {groupIdentifier, emojiUrl}, size = 'lg'}: Readonly<OwnerGuildContentProps>): JSX.Element {
	const theme = useMantineTheme();

	return <>
		{emojiUrl ?
			<Group gap={4}>
				<Image src={emojiUrl} w={theme.fontSizes[size]}/>
				{groupIdentifier}
			</Group>
			:
			<Text mx={4}>{groupIdentifier}</Text>
		}
	</>;
}
