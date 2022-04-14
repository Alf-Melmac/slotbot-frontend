import {StatCounter} from './StatCounter';
import {Group} from '@mantine/core';
import {useIntersection} from '@mantine/hooks';

type EventStatsProps = {};

export function EventStats(props: EventStatsProps): JSX.Element {
	const {} = props;
	const [ref, observer] = useIntersection();

	return (
		<Group grow mt={'xl'} ref={ref}>
			<StatCounter countEnd={198} info={"Events in den letzten 365 Tagen"}
						 isCounting={observer?.isIntersecting}/>
			<StatCounter countEnd={2059} info={"Belegte Slots in den letzten 365 Tagen"}
						 isCounting={observer?.isIntersecting}/>
		</Group>
	);
}
