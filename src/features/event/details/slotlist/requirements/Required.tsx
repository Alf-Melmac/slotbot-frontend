import {JSX} from 'react';
import {EventSlotlistProps} from '../EventSlotlist';
import {Box, Text} from '@mantine/core';
import {Requirements} from '../../../../guilds/guild/config/requirement/Requirements';

type RequiredProps = {
	itemBefore: boolean;
	requirementList: EventSlotlistProps['squadList'][number]['requirements'] | EventSlotlistProps['squadList'][number]['slotList'][number]['requirements'];
};

export function Required({itemBefore, requirementList}: Readonly<RequiredProps>): JSX.Element {
	return <>
		{(itemBefore && requirementList.length > 0) && <Text c={'dimmed'}>|</Text>}
		<Box ml={4}>
			<Requirements requirements={requirementList.flatMap(l => l.requirements)} size={'sm'}/>
		</Box>
	</>;
}
