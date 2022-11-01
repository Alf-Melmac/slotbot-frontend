import {Badge} from '@mantine/core';

type CounterBadgeProps = {
	currentValue: number;
	maxValue: number;
	yellowPhase?: boolean;
};

export function CounterBadge(props: CounterBadgeProps): JSX.Element {
	const {currentValue, maxValue, yellowPhase = false} = props;
	let badgeColor;
	if (maxValue <= currentValue) {
		badgeColor = 'red';
	} else if (yellowPhase && maxValue * 0.9 < currentValue) {
		badgeColor = 'yellow';
	} else {
		badgeColor = 'green';
	}

	return <Badge color={badgeColor}>{currentValue}/{maxValue}</Badge>;
}
