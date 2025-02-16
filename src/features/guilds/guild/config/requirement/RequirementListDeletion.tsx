import {Button, Group, Stack} from '@mantine/core';
import {JSX} from 'react';
import {T} from '../../../../../components/T';
import {RequirementListDto} from './requirementTypes';
import {SharedModalChild} from '../../../../../components/SharedModal';
import slotbotServerClient, {voidFunction} from '../../../../../hooks/slotbotServerClient';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {useGuildPage} from '../../../../../contexts/guild/GuildPageContext';

type RequirementListDeletionProps = Pick<RequirementListDto, 'id'> & Pick<SharedModalChild, 'closeModal'>;

export function RequirementListDeletion({id, closeModal}: Readonly<RequirementListDeletionProps>): JSX.Element {
	const queryClient = useQueryClient();
	const {guildId} = useGuildPage();
	const deleteRequirementList = () => slotbotServerClient.delete(`/requirement-list/${id}`).then(voidFunction);
	const {mutate, isPending} = useMutation<void, AxiosError>({
		mutationFn: deleteRequirementList,
		onSuccess: () => {
			queryClient.setQueryData(['requirementLists', guildId],
				(old: RequirementListDto[]) => old.filter(list => list.id !== id));
			closeModal();
		},
	});

	return <Stack>
		<T k={'guild.requirementList.delete.description'}/>
		<Group justify={'flex-end'}>
			<Button variant={'default'} onClick={closeModal}><T k={'action.cancel'}/></Button>
			<Button color={'red'} loading={isPending} onClick={() => mutate()}>
				<T k={'action.delete'}/>
			</Button>
		</Group>
	</Stack>;
}
