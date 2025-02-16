import {JSX} from 'react';
import {RequiredPick} from '../../../../utils/typesHelper';
import {SlotListEntrySettingsProps} from './SlotListEntrySettings';
import {Alert, ComboboxItem, ComboboxItemGroup, MultiSelect, Select, Skeleton} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import {T} from '../../../../components/T';
import {TextKey, useLanguage} from '../../../../contexts/language/Language';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {getFormFieldValue} from '../../../../utils/formHelper';

type SlotListEntryRequirementSettingProps = RequiredPick<SlotListEntrySettingsProps, 'requirementsQuery' | 'path' | 'index' | 'slot'>;

export function SlotListEntryRequirementSetting(props: Readonly<SlotListEntryRequirementSettingProps>): JSX.Element {
	const {requirementsQuery: {data, isLoading, isError}, path, index, slot} = props;
	const form = useFormContext();
	const {t} = useLanguage();

	if (isLoading) {
		return <Skeleton width={'100%'} height={60}/>;
	}
	if (isError || !data) {
		return <>
			<Alert icon={<FontAwesomeIcon icon={faCircleExclamation}/>} color={'red'}>
				<T k={'event.requirements.error'}/>
			</Alert>
			<Select label={<T k={'slotlistEntry.settings.requirements.label'}/>}
					description={<T k={'event.requirements.description'}/>}
					placeholder={t('event.requirements.placeholder')}
					data={[]} disabled/>
		</>;
	}

	if (data?.length === 0) {
		return <></>;
	}

	let availableRequirements = [...data];
	const selectData: ComboboxItemGroup<ComboboxItem>[] = [];
	const requirementsFlat = data.flatMap(requirementList => requirementList.requirements);

	function applySelectedRequirements(selectedRequirements: string[], group: TextKey) {
		const requirements = requirementsFlat
			.filter(requirement => selectedRequirements.includes(requirement.id.toString()));

		availableRequirements = availableRequirements.map(requirementList => ({
			...requirementList,
			requirements: requirementList.requirements.filter(requirement => !requirements.includes(requirement)),
		}));

		selectData.push({
			group: t(group),
			items: requirements.map(requirement => ({
				value: `${requirement.id}`,
				label: requirement.name,
				disabled: true,
			})),
		});
	}

	applySelectedRequirements(
		getFormFieldValue(form, 'requirements'),
		'slotlistEntry.settings.requirements.inheritedFromEvent',
	);

	if (slot) {
		applySelectedRequirements(
			getFormFieldValue(form, `${path.slice(0, path.lastIndexOf('.'))}.requirements`),
			'slotlistEntry.settings.requirements.inheritedFromSquad',
		);
	}

	availableRequirements = availableRequirements.filter(requirementList => requirementList.requirements.length > 0);
	const requirements = availableRequirements.map(requirementList => ({
			group: requirementList.name,
			items: requirementList.requirements.map(requirement => ({
				value: `${requirement.id}`,
				label: requirement.name,
			})),
		}),
	);

	return <MultiSelect label={<T k={'slotlistEntry.settings.requirements.label'}/>}
						description={<T k={'event.requirements.description'}/>}
						placeholder={t('event.requirements.placeholder')}
						data={[...selectData, ...requirements]}
						clearable searchable
						{...form.getInputProps(`${path}.${index}.requirements`)}/>;
}
