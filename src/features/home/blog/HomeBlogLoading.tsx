import {JSX} from 'react';
import {DelayedVisible} from '../../../components/Delayed/DelayedVisible';
import {Card, Skeleton, Stack} from '@mantine/core';

export function HomeBlogLoading(): JSX.Element {
	const three = Array.from({length: 3});
	return <>
		{three.map((_, i) => (
			<DelayedVisible component={Card} withBorder key={i}>
				<Stack gap={'xs'}>
					{three.map((_, j) => (
						<Skeleton key={j} height={20}/>
					))}
				</Stack>
			</DelayedVisible>
		))}
	</>;
}
