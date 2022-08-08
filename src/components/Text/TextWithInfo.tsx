import {Box, Group, Tooltip, TooltipProps} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleInfo} from '@fortawesome/free-solid-svg-icons';

type TextWithInfoProps = {
	text: string;
	tooltip: TooltipProps['label'];
	multiline?: TooltipProps['multiline'];
	width?: TooltipProps['width'];
	position?: TooltipProps['position'];
};

export function TextWithInfo(props: TextWithInfoProps): JSX.Element {
	const {text, tooltip, multiline, width, position} = props;

	return (
		<Group spacing={'xs'}>
			{text} <Tooltip sx={{fontWeight: 350}} label={tooltip} multiline={multiline} width={width} position={position}>
			<Box>
				<FontAwesomeIcon icon={faCircleInfo}/>
			</Box>
		</Tooltip>
		</Group>
	);
}
