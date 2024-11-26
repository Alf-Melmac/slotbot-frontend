import {JSX} from 'react';
import {useGuildPage} from '../../../../../contexts/guild/GuildPageContext';
import slotbotServerClient from '../../../../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';
import {RequirementListDto} from './requirementTypes';
import {Avatar, Checkbox, ScrollArea, Skeleton, Table, Tooltip} from '@mantine/core';
import {T} from '../../../../../components/T';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPuzzlePiece} from '@fortawesome/free-solid-svg-icons';
import {AddRequirementList} from './AddRequirementList';

export function GuildRequirementList(): JSX.Element {
	const {guildId} = useGuildPage();

	const getGuildRequirementLists = () => slotbotServerClient.get(`/requirement-list/${guildId}`).then(res => res.data);
	const {data, isLoading} = useQuery<RequirementListDto[], Error>({
		queryKey: ['requirementLists', guildId],
		queryFn: getGuildRequirementLists,
	});

	return <>
		<ScrollArea h={250}>
			<Table highlightOnHover stickyHeader>
				<Table.Thead>
					<Table.Tr>
						<Table.Th><T k={'guild.requirementList.name'}/></Table.Th>
						<Table.Th><T k={'guild.requirementList.memberAssignable'}/></Table.Th>
						<Table.Th><T k={'guild.requirementList.enforced'}/></Table.Th>
						<Table.Th></Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					{isLoading ?
						<>{
							[...Array(3)].map((_, i) => (
								<Table.Tr key={i}>
									<Table.Td><Skeleton height={28}/></Table.Td>
									<Table.Td><Skeleton height={28}/></Table.Td>
									<Table.Td><Skeleton height={28}/></Table.Td>
									<Table.Td><Skeleton height={28}/></Table.Td>
								</Table.Tr>
							))
						}</>
						:
						data?.map((list) => (
							<Table.Tr key={list.id}>
								<Table.Td>
									{list.name}
								</Table.Td>
								<Table.Td>
									<Checkbox.Indicator checked={list.memberAssignable}/>
								</Table.Td>
								<Table.Td>
									<Checkbox.Indicator checked={list.enforced}/>
								</Table.Td>
								<Table.Td>
									<Requirements requirements={list.requirements}/>
								</Table.Td>
							</Table.Tr>
						))
					}
				</Table.Tbody>
			</Table>
		</ScrollArea>

		<AddRequirementList/>
	</>;
}

function Requirements({requirements}: Readonly<{ requirements: RequirementListDto['requirements'] }>): JSX.Element {
	return <Avatar.Group>
		{requirements.slice(0, 4).map((requirement, index) => (
			<Tooltip
				key={requirement.id}
				label={index < 3 ?
					requirement.name :
					requirements.slice(3).map(requirement => <div key={requirement.id}>{requirement.name}</div>)}
				withArrow
			>
				<Avatar src={requirement.icon}>
					{index < 3 ? <FontAwesomeIcon icon={faPuzzlePiece}/> : `+${requirements.length - 3}`}
				</Avatar>
			</Tooltip>
		))}
	</Avatar.Group>;
}
