import {Group, TooltipProps} from '@mantine/core';
import {InfoTooltip} from './InfoTooltip';

type TextWithInfoProps = {
	text: JSX.Element;
	tooltip: JSX.Element;
	/**
	 * @default {@link YPosition.RIGHT}
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

export function ElementWithInfo(props: TextWithInfoProps): JSX.Element {
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

function InfoTooltipIcon(props: TextWithInfoProps): JSX.Element {
	const {tooltip, multiline, tooltipWidth, tooltipPosition} = props;

	return <InfoTooltip sx={{fontWeight: 350}} label={tooltip} multiline={multiline} width={tooltipWidth}
						position={tooltipPosition}/>;
}
