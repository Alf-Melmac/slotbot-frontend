import {Box, Group, Tooltip, TooltipProps} from '@mantine/core';
import {JSX} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleInfo} from '@fortawesome/free-solid-svg-icons';

type TextWithInfoProps = {
	text: JSX.Element;
	tooltip: JSX.Element;
	/**
	 * @default YPosition.RIGHT
	 */
	iconPosition?: YPosition;
	multiline?: TooltipProps['multiline'];
	tooltipWidth?: TooltipProps['width'];
	tooltipPosition?: TooltipProps['position'];
};

export enum YPosition {
	RIGHT,
	LEFT
}

export function ElementWithInfo(props: Readonly<TextWithInfoProps>): JSX.Element {
	const {text, iconPosition = YPosition.RIGHT} = props;

	return (
		<Group spacing={'xs'}>
			{iconPosition === YPosition.RIGHT &&
                <>
					{text} <InfoTooltipIcon {...props}/>
                </>
			}
			{iconPosition === YPosition.LEFT &&
                <>
                    <InfoTooltipIcon {...props}/> {text}
                </>
			}
		</Group>
	);
}

function InfoTooltipIcon(props: Readonly<TextWithInfoProps>): JSX.Element {
	const {tooltip, multiline, tooltipWidth, tooltipPosition} = props;

	return <Tooltip label={tooltip} multiline={multiline} width={tooltipWidth}
					position={tooltipPosition}>
		<Box>
			<FontAwesomeIcon icon={faCircleInfo}/>
		</Box>
	</Tooltip>;
}
