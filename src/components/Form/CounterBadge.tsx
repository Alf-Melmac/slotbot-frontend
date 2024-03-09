import {Badge} from '@mantine/core';
import {JSX} from 'react';

type CounterBadgeProps = {
	currentValue: number;
	maxValue: number;
	yellowPhase?: boolean;
};

export function CounterBadge(props: Readonly<CounterBadgeProps>): JSX.Element {
	const {currentValue, maxValue, yellowPhase = false} = props;
	let badgeColor;
	if (maxValue <= currentValue) {
		badgeColor = 'red';
	} else if (yellowPhase && maxValue * 0.9 < currentValue) {
		badgeColor = 'yellow';
	} else {
		badgeColor = 'green';
	}

	return <Badge color={badgeColor} variant={'light'}>{currentValue}/{maxValue}</Badge>;
}
