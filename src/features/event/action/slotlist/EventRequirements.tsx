import {JSX, useEffect} from 'react';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {useGetEventTypeRequirements} from './useGetEventTypeRequirements';
import {Alert, Box, MultiSelect, Select, Skeleton} from '@mantine/core';
import {T} from '../../../../components/T';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import {useLanguage} from '../../../../contexts/language/Language';

export function EventRequirements(): JSX.Element {
	const form = useFormContext();
	const {t} = useLanguage();

	const {data, isLoading} = useGetEventTypeRequirements(form.values.eventType.id);
	useEffect(() => {
		if (!data || form.getValues().requirements.length === 0) return;
		if (data.length === 0) {
			form.setFieldValue('requirements', []);
		} else {
			//Only keep requirements that are still available
			form.setFieldValue('requirements', form.values.requirements.filter((requirement) => data
				.some(requirementList => requirementList.requirements
					.some(r => r.id === Number.parseInt(requirement)))));
		}
	}, [data]);

	if (isLoading) {
		return <Skeleton maw={500} height={60} mb={'xs'}/>;
	}

	if (data?.length === 0) {
		return <></>;
	}
	return <>
		{data ?
			<Box maw={500} mb={'xs'}>
				<MultiSelect label={<T k={'event.requirements'}/>}
							 description={<T k={'event.requirements.description'}/>}
							 placeholder={t('event.requirements.placeholder')}
							 data={data.map(requirementList => ({
									 group: requirementList.name,
									 items: requirementList.requirements.map(requirement => {
										 return {
											 value: `${requirement.id}`,
											 label: requirement.name,
										 };
									 }),
								 }),
							 )}
							 clearable searchable
							 {...form.getInputProps('requirements')}/>
			</Box>
			:
			<>
				<Alert icon={<FontAwesomeIcon icon={faCircleExclamation}/>} color={'red'}>
					<T k={'event.requirements.error'}/>
				</Alert>
				<Box maw={500} mb={'xs'}>
					<Select label={<T k={'event.requirements'}/>} data={[]} disabled/>
				</Box>
			</>}
	</>;
}
