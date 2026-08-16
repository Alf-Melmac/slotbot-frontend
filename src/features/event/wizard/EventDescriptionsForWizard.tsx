import {JSX} from 'react';
import {EventActionPageTitle} from '../action/EventActionPageTitle';
import {Alert, Badge, Card, Group, Stack, Text, Title} from '@mantine/core';
import {T} from '../../../components/T';
import {EventDescription} from '../action/description/EventDescription';
import {EventExtendedDescription} from '../action/description/EventExtendedDescription';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleInfo, faLightbulb} from '@fortawesome/free-solid-svg-icons';

export function EventDescriptionsForWizard(): JSX.Element {
	return <>
		<EventActionPageTitle title={'event.wizard.step.description.title'}/>
		<Text variant={'secondary'} mb={'lg'}>
			<T k={'event.wizard.step.description.description'}/>
		</Text>

		<Stack>
			<Card>
				<Title order={3}><T k={'event.description.short'}/></Title>
				<Text variant={'secondary'} mb={'sm'}>
					<T k={'event.description.short.description'}/>
				</Text>
				<Alert icon={<FontAwesomeIcon icon={faLightbulb}/>} color={'teal'} mb={'sm'}>
					<T k={'event.description.short.tip'} html/>
				</Alert>
				<EventDescription/>
			</Card>

			<Card>
				<Group gap={'sm'}>
					<Title order={3}><T k={'event.description.extended'}/></Title>
					<Badge color={'gray'}><T k={'optional'}/></Badge>
				</Group>
				<Text variant={'secondary'} mb={'sm'}>
					<T k={'event.description.extended.description'}/>
				</Text>
				<EventExtendedDescription/>
			</Card>

			<Alert icon={<FontAwesomeIcon icon={faCircleInfo}/>} color={'blue'}>
				<Stack gap={'sm'}>
					<Title order={4}><T k={'event.description.explanation'}/></Title>
					<Group wrap={'nowrap'}>
						<Stack gap={2}>
							<Text fw={600}><T k={'event.description.short'}/></Text>
							<Text><T k={'event.description.explanation.short'}/></Text>
						</Stack>
						<Stack gap={2}>
							<Text fw={600}><T k={'event.description.extended'}/></Text>
							<Text><T k={'event.description.explanation.extended'}/></Text>
						</Stack>
					</Group>
				</Stack>
			</Alert>
		</Stack>
	</>;
}
