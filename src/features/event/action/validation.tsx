import {FormErrors} from '@mantine/form';
import {
	colorField,
	length,
	maxLengthField,
	requiredFieldWithMaxLength,
	urlField,
	validate,
} from '../../../utils/formHelper';
import {EMBED, EMBEDDABLE_TITLE, EMBEDDABLE_VALUE, TEXT} from '../../../utils/maxLength';
import {EventActionFormType} from '../../../contexts/event/action/EventActionFormContext';
import dayjs from 'dayjs';
import {T} from '../../../components/T';

export const eventActionValidate = (values: EventActionFormType, active?: number) => {
	const activePresent = active != undefined;
	let errors: FormErrors = {};
	if (!activePresent || active === 0) {
		errors = {
			name: requiredFieldWithMaxLength(values.name, TEXT),
			date: validate(dayjs().isAfter(values.date, 'day'), <T k={'validation.onlyFuture'}/>),
			creator: requiredFieldWithMaxLength(values.creator, TEXT),
			'eventType.name': requiredFieldWithMaxLength(values.eventType.name, TEXT),
			'eventType.color': colorField(values.eventType.color),
			missionType: maxLengthField(values.missionType, TEXT),
			missionLength: maxLengthField(values.missionLength, TEXT),
			pictureUrl: urlField(values.pictureUrl),
		};
		validateEmbedSize(values, errors);
	}

	if (!activePresent || active === 1) {
		values.details.forEach((field, i) => {
			errors[`details.${i}.title`] = requiredFieldWithMaxLength(field.title, EMBEDDABLE_TITLE);
			// noinspection SuspiciousTypeOfGuard Text may be boolean if using default field
			if (typeof field.text === 'string') {
				errors[`details.${i}.text`] = requiredFieldWithMaxLength(field.text, EMBEDDABLE_VALUE);
			}
		});
		validateEmbedSize(values, errors);
	}

	if (!activePresent || active === 2) {
		validateSquadList(values, errors);
	}

	return errors;
};

function validateEmbedSize(values: EventActionFormType, errors: FormErrors): void {
	const embedLength =
		//Title + Description + eventTypeName + " Mission von " + creator
		length(values.name) + length(values.description) + length(values.eventType.name) + 13 + length(values.creator) +
		values.details.map(detailsFieldTextLength).reduce((previous, current) => previous + current, 0) +
		//"Zeitplan" + Datum + " Uhr" + (" und dauert " + missionLength) + ("Missionstyp" + missionType) + #reserveParticipatingFieldSize
		8 + 16 + 4 + ifPresentAddLength(values.missionLength, 12) + ifPresentAddLength(values.missionType, 11) + reserveParticipatingFieldSize(values.reserveParticipating);
	if (embedLength > EMBED) {
		const error = <T k={'validation.event.embedSize'} args={[EMBED, embedLength]}/>;
		errors.name = error;
		errors.description = error;
		values.details.forEach((field, i) => {
			errors[`details.${i}.title`] = error;
			errors[`details.${i}.text`] = error;
		});
	}
}

function ifPresentAddLength(field: string, supplementaryText = 0): number {
	return field ? length(field) + supplementaryText : 0;
}

function detailsFieldTextLength(field: EventActionFormType['details'][number]): number {
	let fieldLength = length(field.title);
	// @ts-ignore Text may be boolean if using default field
	if (field.text === 'true' || field.text === true) {
		fieldLength += 2; //"Ja"
		// @ts-ignore Text may be boolean if using default field
	} else if (field.text === 'false' || field.text === false) {
		fieldLength += 4; //"Nein"
	} else {
		fieldLength += length(field.text); //Currently this doesn't respect auto generated links
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
	values.squadList.forEach((squad, squadIndex) => {
		errors[`squadList.${squadIndex}.name`] = requiredFieldWithMaxLength(squad.name, TEXT);
		squad.slotList.forEach((slot, slotIndex) => {
			errors[`squadList.${squadIndex}.slotList.${slotIndex}.name`] = requiredFieldWithMaxLength(slot.name, TEXT);
			errors[`squadList.${squadIndex}.slotList.${slotIndex}.number`] =
				validate(!Number.isSafeInteger(slot.number) || slot.number <= 0, <T k={'no'}/>);
		});
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
			value.path.forEach((path: string) => {
				errors[path] = <T k={'validation.ambiguous'}/>;
			});
		}
	});
}
