import {JSX} from 'react';
import {RequirementListDto} from './requirementTypes';
import {Avatar, Tooltip} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPuzzlePiece} from '@fortawesome/free-solid-svg-icons';

type RequirementsProps = {
    requirements: RequirementListDto['requirements']
};

export function Requirements({requirements}: Readonly<RequirementsProps>): JSX.Element {
    return <Avatar.Group>
        {requirements.slice(0, 4).map((requirement, index) => (
            <Tooltip
                key={requirement.id}
                label={index < 3 ?
                    requirement.name :
                    requirements.slice(3).map(requirement => <div key={requirement.id}>{requirement.name}</div>)}
                withArrow
            >
                <Avatar src={requirement.icon}>
                    {index < 3 ? <FontAwesomeIcon icon={faPuzzlePiece}/> : `+${requirements.length - 3}`}
                </Avatar>
            </Tooltip>
        ))}
    </Avatar.Group>;
}
