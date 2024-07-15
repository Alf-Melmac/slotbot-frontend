import {JSX} from 'react';
import {Button, Group, Image, Modal, ModalProps, Stack, Tabs, Text, Title} from '@mantine/core';
import {T} from '../../T';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleCheck, faCircleXmark} from '@fortawesome/free-regular-svg-icons';
import classes from './FeaturePreview.module.css';
import {FeatureFlag, MaybeFeatureFlag, useGetFeatureFlags} from '../../../features/featureFlag/useGetFeatureFlags';
import blogPreview from './Blog-Loading.png';
import slotbotServerClient from '../../../hooks/slotbotServerClient';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosError} from 'axios';

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
		}
	});

	if (featureQuery.isLoading) {
		return <></>;
	}

	function leftSide(feature: MaybeFeatureFlag): JSX.Element {
		return featureQuery.data?.includes(feature) ? <FontAwesomeIcon icon={faCircleCheck} color={'green'}/> :
			<FontAwesomeIcon icon={faCircleXmark}/>;
	}

	function Toggle({feature}: { feature: MaybeFeatureFlag }): JSX.Element {
		return <Button size={'xs'} variant={'default'} loading={isPending} onClick={() => mutate(feature)}>
			{featureQuery.data?.includes(feature) ? 'Disable' : 'Enable'}
		</Button>;
	}

	return <Modal opened={props.opened} onClose={props.onClose} title={<T k={'userMenu.featurePreview'}/>}
				  size={'xl'} classNames={{body: classes.card}}>
		{featureQuery.isSuccess &&
            <Tabs orientation={'vertical'} defaultValue={FeatureFlag.BLOG}>
                <Tabs.List>
                    <Tabs.Tab value={FeatureFlag.BLOG} leftSection={leftSide(FeatureFlag.BLOG)}>Guild Home
                        Page</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value={FeatureFlag.BLOG}>
                    <Stack p={'md'}>
                        <Group justify={'space-between'}>
                            <Title order={3}>Guild Home Page</Title>
                            <Toggle feature={FeatureFlag.BLOG}/>
                        </Group>
                        <Image src={blogPreview}/>
                        <Text>
                            Adds a home page for your guild instead of the default calendar view. This page contains
                            messages from the community admins and the upcoming events.
                        </Text>
                    </Stack>
                </Tabs.Panel>
            </Tabs>
		}
	</Modal>;
}
