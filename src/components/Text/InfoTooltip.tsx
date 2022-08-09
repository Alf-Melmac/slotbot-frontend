import {Box, Tooltip, TooltipProps} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleInfo} from '@fortawesome/free-solid-svg-icons';

export function InfoTooltip(props: Omit<TooltipProps, 'children'>): JSX.Element {
    return (
        <Tooltip sx={{fontWeight: 350}} {...props}>
            <Box>
                <FontAwesomeIcon icon={faCircleInfo}/>
            </Box>
        </Tooltip>
    );
}
