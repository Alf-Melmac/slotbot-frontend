import {JSX} from 'react';
import {RequirementListDto} from './requirementTypes';
import {Avatar, AvatarProps, Group, Tooltip} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPuzzlePiece} from '@fortawesome/free-solid-svg-icons';

type RequirementsProps = {
	requirements: RequirementListDto['requirements'];
	size?: AvatarProps['size'];
};

export function Requirements({requirements, size}: Readonly<RequirementsProps>): JSX.Element {
	const lessThanFive = requirements.length < 5;

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
				<Avatar src={displayIcon ? requirement.icon : undefined} size={size}>
					{displayIcon ? <FontAwesomeIcon icon={faPuzzlePiece}/> : `+${requirements.length - 3}`}
				</Avatar>
			</Tooltip>;
		})}
	</Avatar.Group>;
}

function RequirementsOverflow({requirements}: Readonly<RequirementsProps>): JSX.Element {
	return <>
		{requirements.map(requirement => <Group key={requirement.id} gap={2} wrap={'nowrap'}>
			<Avatar src={requirement.icon} size={'sm'}>
				<FontAwesomeIcon icon={faPuzzlePiece}/>
			</Avatar>
			{requirement.name}
		</Group>)}
	</>;
}
