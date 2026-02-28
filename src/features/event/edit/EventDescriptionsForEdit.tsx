import {JSX, useState} from 'react';
import {Tabs} from '@mantine/core';
import {T} from '../../../components/T';
import {EventDescription} from '../action/description/EventDescription';
import {EventExtendedDescription} from '../action/description/EventExtendedDescription';

export function EventDescriptionsForEdit(): JSX.Element {
	const [activeTab, setActiveTab] = useState<string | null>('regular');

	return <Tabs variant={'pills'} value={activeTab} onChange={setActiveTab}>
		<Tabs.List grow>
			<Tabs.Tab value={'regular'}>
				<T k={'event.description.short'}/>
			</Tabs.Tab>
			<Tabs.Tab value={'extended'}>
				<T k={'event.description.extended'}/>
			</Tabs.Tab>
		</Tabs.List>
		<Tabs.Panel value={'regular'} pt={'xs'}>
			<EventDescription showDescription={() => setActiveTab('regular')}/>
		</Tabs.Panel>
		<Tabs.Panel value={'extended'} pt={'xs'}>
			<EventExtendedDescription showDescription={() => setActiveTab('extended')}/>
		</Tabs.Panel>
	</Tabs>;
}
