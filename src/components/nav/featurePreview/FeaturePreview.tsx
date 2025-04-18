import {JSX} from 'react';
import {Button, Group, Modal, ModalProps, Stack, Tabs, Text, Title} from '@mantine/core';
import {T} from '../../T';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleCheck, faCircleXmark} from '@fortawesome/free-regular-svg-icons';
import classes from './FeaturePreview.module.css';
import {FeatureFlag, MaybeFeatureFlag, useGetFeatureFlags} from '../../../features/featureFlag/useGetFeatureFlags';
import slotbotServerClient from '../../../hooks/slotbotServerClient';
import {UseMutateFunction, useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {AnchorBlank} from '../../Text/AnchorBlank';

type FeaturePreviewProps = Pick<ModalProps, 'opened' | 'onClose'>;

export function FeaturePreview(props: Readonly<FeaturePreviewProps>): JSX.Element {
	const featureQuery = useGetFeatureFlags();

	const queryClient = useQueryClient();
	const toggleFeatureFlag = (feature: MaybeFeatureFlag) => slotbotServerClient.post('/feature-flags', feature, {headers: {'Content-Type': 'text/plain'}})
		.then((res) => res.data);
	const {mutate, isPending} = useMutation<boolean, AxiosError, MaybeFeatureFlag>({
		mutationFn: toggleFeatureFlag,
		onSuccess: (data, variables) => {
			queryClient.setQueryData(['feature-flags'], (flags: MaybeFeatureFlag[]) => {
				if (data) {
					return [...flags, variables];
				}
				return flags.filter((flag) => flag !== variables);
			});
		},
	});

	if (featureQuery.isLoading) {
		return <></>;
	}

	function leftSide(feature: MaybeFeatureFlag): JSX.Element {
		return featureQuery.data?.includes(feature) ? <FontAwesomeIcon icon={faCircleCheck} color={'green'}/> :
			<FontAwesomeIcon icon={faCircleXmark}/>;
	}

	return <Modal opened={props.opened} onClose={props.onClose} title={<T k={'userMenu.featurePreview'}/>}
				  size={'xl'} classNames={{body: classes.card}}>
		{featureQuery.isSuccess &&
            <Tabs orientation={'vertical'} defaultValue={FeatureFlag.REQUIREMENTS}>
                <Tabs.List>
                    <Tabs.Tab value={FeatureFlag.REQUIREMENTS}
                              leftSection={leftSide(FeatureFlag.REQUIREMENTS)}>Requirements</Tabs.Tab>
                    <Tabs.Tab value={FeatureFlag.PARTICIPANT_LOG}
                              leftSection={leftSide(FeatureFlag.PARTICIPANT_LOG)}>Participant Log</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value={FeatureFlag.REQUIREMENTS}>
                    <Stack p={'md'}>
                        <Group justify={'space-between'}>
                            <Title order={3}>Requirements</Title>
                            <FeatureToggle feature={FeatureFlag.REQUIREMENTS} featureFlags={featureQuery.data}
                                           mutate={mutate} isPending={isPending}/>
                        </Group>
                        <Text>
                            Requirements restrict the group of participants or indicate that a certain condition must be
                            met. Requirements are enabled for event types and can then be applied by the event creator
                            to entire events, squads or slots. For each requirement, you can decide whether attendees
                            can register without meeting the requirement, and whether attendees can choose to meet the
                            requirement independently.<br/>
                            To get started, go into your community settings and create the first requirement list.
                        </Text>
                        <AnchorBlank href={'https://discord.gg/HSkgZNhfNK'} size={'sm'}>Give Feedback</AnchorBlank>
                    </Stack>
                </Tabs.Panel>
                <Tabs.Panel value={FeatureFlag.PARTICIPANT_LOG}>
                    <Stack p={'md'}>
                        <Group justify={'space-between'}>
                            <Title order={3}>Participant Log</Title>
                            <FeatureToggle feature={FeatureFlag.PARTICIPANT_LOG}
                                           featureFlags={featureQuery.data} mutate={mutate} isPending={isPending}/>
                        </Group>
                        <Text>
                            Shows the time at which event participants slotted, unslotted or swapped in the event
                            details.
                        </Text>
                        <AnchorBlank href={'https://discord.gg/HSkgZNhfNK'} size={'sm'}>Give Feedback</AnchorBlank>
                    </Stack>
                </Tabs.Panel>
            </Tabs>
		}
	</Modal>;
}

type FeatureToggleProps = {
	feature: MaybeFeatureFlag;
	featureFlags: MaybeFeatureFlag[];
	mutate: UseMutateFunction<boolean, AxiosError, string>;
	isPending: boolean;
};

function FeatureToggle({feature, featureFlags, mutate, isPending}: Readonly<FeatureToggleProps>): JSX.Element {
	return <Button size={'xs'} variant={'default'} loading={isPending} onClick={() => mutate(feature)}>
		{featureFlags.includes(feature) ? 'Disable' : 'Enable'}
	</Button>;
}
