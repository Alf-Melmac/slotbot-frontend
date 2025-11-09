import {JSX} from 'react';
import {Box, Button, Modal, ModalProps} from '@mantine/core';
import {T} from '../../T';
import classes from './FeaturePreview.module.css';
import {MaybeFeatureFlag} from '../../../features/featureFlag/useGetFeatureFlags';
import {UseMutateFunction} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {AnchorBlank} from '../../Text/AnchorBlank';

type FeaturePreviewProps = Pick<ModalProps, 'opened' | 'onClose'>;

export function FeaturePreview(props: Readonly<FeaturePreviewProps>): JSX.Element {
	/*const featureQuery = useGetFeatureFlags();

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
	}*/

	return <Modal opened={props.opened} onClose={props.onClose} title={<T k={'userMenu.featurePreview'}/>}
				  size={'xl'} classNames={{body: classes.card}}>
		<Box pl={'md'}>
			Thanks for your interest. At the moment, there's no feature being tested. You can find the results of
			previous trials at <AnchorBlank
			href={'https://docs.slotbot.de/pers%C3%B6nliche-einstellungen/feature-vorschau'}>https://docs.slotbot.de/persönliche-einstellungen/feature-vorschau</AnchorBlank>
		</Box>
		{/*{featureQuery.isSuccess &&
			<Tabs orientation={'vertical'} defaultValue={FeatureFlag.FEATURE_FLAG}
				  classNames={{tabLabel: classes.tabLabel}}>
				<Tabs.List>
					<Tabs.Tab value={FeatureFlag.FEATURE_FLAG}
							  leftSection={leftSide(FeatureFlag.FEATURE_FLAG)}>FEATURE_FLAG_NAME</Tabs.Tab>
				</Tabs.List>

				<Tabs.Panel value={FeatureFlag.FEATURE_FLAG}>
					<Stack p={'md'}>
						<Group justify={'space-between'}>
							<Title order={3}>FEATURE_FLAG_NAME</Title>
							<FeatureToggle feature={FeatureFlag.FEATURE_FLAG} featureFlags={featureQuery.data}
										   mutate={mutate} isPending={isPending}/>
						</Group>
						<Text>
							FEATURE_FLAG_DESCRIPTION
						</Text>
						<AnchorBlank href={'https://discord.gg/HSkgZNhfNK'} size={'sm'}>Give Feedback</AnchorBlank>
					</Stack>
				</Tabs.Panel>
			</Tabs>
		}*/}
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
