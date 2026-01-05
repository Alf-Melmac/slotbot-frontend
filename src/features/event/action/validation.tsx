import {FormErrors} from '@mantine/form';
import {
	colorField,
	length,
	maxLengthField,
	requiredField,
	requiredFieldWithMaxLength,
	urlField,
	validate,
} from '../../../utils/formHelper';
import {EMBED, EMBEDDABLE_DESCRIPTION, EMBEDDABLE_TITLE, EMBEDDABLE_VALUE, TEXT} from '../../../utils/maxLength';
import {EventActionFormType} from '../../../contexts/event/action/EventActionFormContext';
import dayjs from 'dayjs';
import {T} from '../../../components/T';
import {CharacterCountCache} from '../../../contexts/event/action/CharacterCountCacheContext';

export const eventActionValidate = (values: EventActionFormType, characterCountCache: CharacterCountCache, active?: number) => {
	const activePresent = active != undefined;
	let errors: FormErrors = {};
	if (!activePresent || active === 0) {
		errors = {
			name: requiredFieldWithMaxLength(values.name, TEXT),
			date: validate(dayjs().isAfter(values.date, 'day'), <T k={'validation.onlyFuture'}/>),
			creator: requiredFieldWithMaxLength(values.creator, TEXT),
			'eventType.name': requiredFieldWithMaxLength(values.eventType.name, TEXT),
			'eventType.color': colorField(values.eventType.color),
			description: validate(characterCountCache.description > EMBEDDABLE_DESCRIPTION,
				<T k={'validation.maxLength'} args={[EMBEDDABLE_DESCRIPTION]}/>),
			missionType: maxLengthField(values.missionType, TEXT),
			missionLength: maxLengthField(values.missionLength, TEXT),
			pictureUrl: urlField(values.pictureUrl),
		};
		validateEmbedSize(values, errors, characterCountCache);
	}

	if (!activePresent || active === 1) {
		for (const [i, field] of values.details.entries()) {
			errors[`details.${i}.title`] = requiredFieldWithMaxLength(field.title, EMBEDDABLE_TITLE);
			// noinspection SuspiciousTypeOfGuard Text may be boolean if using default field
			if (typeof field.text === 'string') {
				const characters = characterCountCache.details[i] ?? length(field.text);
				errors[`details.${i}.text`] = requiredField(characters, () => validate(characters > EMBEDDABLE_VALUE,
					<T k={'validation.maxLength'} args={[EMBEDDABLE_VALUE]}/>));
			}
		}
		validateEmbedSize(values, errors, characterCountCache);
	}

	if (!activePresent || active === 2) {
		validateSquadList(values, errors);
	}

	return errors;
};

function validateEmbedSize(values: EventActionFormType, errors: FormErrors, characterCountCache: CharacterCountCache): void {
	const embedLength =
		//Title + Description + eventTypeName + " Mission von " + creator
		length(values.name) + characterCountCache.description + length(values.eventType.name) + 13 + length(values.creator) +
		values.details.map((detail, i) => detailsFieldTextLength(detail, i, characterCountCache)).reduce((previous, current) => previous + current, 0) +
		//"Zeitplan" + Datum + " Uhr" + (" und dauert " + missionLength) + ("Missionstyp" + missionType) + #reserveParticipatingFieldSize
		8 + 16 + 4 + ifPresentAddLength(values.missionLength, 12) + ifPresentAddLength(values.missionType, 11) + reserveParticipatingFieldSize(values.reserveParticipating);
	if (embedLength > EMBED) {
		const error = <T k={'validation.event.embedSize'} args={[EMBED, embedLength]}/>;
		errors.name = error;
		errors.description = error;
		for (let i = 0; i < values.details.length; i++) {
			errors[`details.${i}.title`] = error;
			errors[`details.${i}.text`] = error;
		}
	}
}

function ifPresentAddLength(field: string, supplementaryText = 0): number {
	return field ? length(field) + supplementaryText : 0;
}

function detailsFieldTextLength(field: EventActionFormType['details'][number], index: number, characterCountCache: CharacterCountCache): number {
	let fieldLength = length(field.title);
	// @ts-ignore Text may be boolean if using default field
	if (field.text === 'true' || field.text === true) {
		fieldLength += 2; //"Ja"
		// @ts-ignore Text may be boolean if using default field
	} else if (field.text === 'false' || field.text === false) {
		fieldLength += 4; //"Nein"
	} else if (typeof field.text === 'string') {
		fieldLength += characterCountCache.details[index] ?? length(field.text);
	}
	return fieldLength;
}

function reserveParticipatingFieldSize(reserveParticipating: EventActionFormType['reserveParticipating']): number {
	if (reserveParticipating === undefined) {
		return 0;
	}
	//"Reserve nimmt teil" + "Ja"/"Nein"
	return 18 + (reserveParticipating ? 2 : 4);
}

type SlotNumberValidationResult = Record<number, { path: string[], count: number }>;

function validateSquadList(values: EventActionFormType, errors: FormErrors): void {
	for (const [squadIndex, squad] of values.squadList.entries()) {
		errors[`squadList.${squadIndex}.name`] = requiredFieldWithMaxLength(squad.name, TEXT);
		for (const [slotIndex, slot] of squad.slotList.entries()) {
			errors[`squadList.${squadIndex}.slotList.${slotIndex}.name`] = requiredFieldWithMaxLength(slot.name, TEXT);
			errors[`squadList.${squadIndex}.slotList.${slotIndex}.number`] =
				validate(!Number.isSafeInteger(slot.number) || slot.number <= 0, <T k={'no'}/>);
		}
		const count = squad.slotList.reduce<SlotNumberValidationResult>((result, c, i) => ({
			...result,
			[c.number]: {
				path: [...(result[c.number]?.path || []), `squadList.${squadIndex}.slotList.${i}.number`],
				count: (result[c.number]?.count || 0) + 1,
			},
		}), {});
		for (const key in count) {
			const value = count[key];
			if (value.count <= 1) continue;
			for (const path of value.path) {
				errors[path] = <T k={'validation.ambiguous'}/>;
			}
		}
	}
}
