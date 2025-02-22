import {JSX} from 'react';
import {RequirementDto, RequirementListDto} from '../guilds/guild/config/requirement/requirementTypes';
import {Avatar, AvatarProps, Group, GroupProps, Tooltip, useComputedColorScheme} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPuzzlePiece} from '@fortawesome/free-solid-svg-icons';

type RequirementsProps = {
	requirements: RequirementListDto['requirements'];
	size?: AvatarProps['size'];
};

/**
 * Displays a list of requirements with icons.
 * If there are more than 4 requirements, everything above 3 will be hidden behind a tooltip.
 */
export function Requirements({requirements, size}: Readonly<RequirementsProps>): JSX.Element {
	const lessThanFive = requirements.length < 5;
	const isLight = useComputedColorScheme() !== 'dark';

	return <Avatar.Group>
		{requirements.slice(0, 4).map((requirement, index) => {
			const displayIcon = lessThanFive || index < 3;
			return <Tooltip
				key={requirement.id}
				label={displayIcon ?
					requirement.name :
					<RequirementsOverflow requirements={requirements.slice(3)}/>}
				withArrow
			>
				<Avatar src={displayIcon ? getIcon(requirement, isLight) : undefined} size={size}>
					{displayIcon ? <FontAwesomeIcon icon={faPuzzlePiece}/> : `+${requirements.length - 3}`}
				</Avatar>
			</Tooltip>;
		})}
	</Avatar.Group>;
}

function RequirementsOverflow({requirements}: Readonly<RequirementsProps>): JSX.Element {
	return <>
		{requirements.map(requirement => <Requirement key={requirement.id} requirement={requirement}/>)}
	</>;
}

type RequirementProps = {
	requirement: RequirementDto;
	gap?: GroupProps['gap'];
}

/**
 * Displays a single requirement with an icon and the name
 */
export function Requirement({requirement, gap = 2}: Readonly<RequirementProps>): JSX.Element {
	const isLight = useComputedColorScheme() !== 'dark';
	return <Group gap={gap} wrap={'nowrap'}>
		<Avatar src={getIcon(requirement, isLight)} size={'sm'}>
			<FontAwesomeIcon icon={faPuzzlePiece}/>
		</Avatar>
		{requirement.name}
	</Group>;
}

function getIcon(requirement: RequirementDto, isLight: boolean) {
	return (isLight && requirement.iconLight) ? requirement.iconLight : requirement.icon;
}
