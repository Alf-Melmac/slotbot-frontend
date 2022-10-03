import {EventPostDto} from '../eventTypes';
import {FormErrors} from '@mantine/form';
import {length, requiredFieldWithMaxLength, validate} from '../../../utils/formHelper';
import {EMBED, TEXT} from '../../../utils/maxLength';

export function validateEmbedSize(values: EventPostDto, errors: FormErrors): void {
	const embedLength =
		//Title + Description + eventTypeName + " Mission von " + creator
		length(values.name) + length(values.description) + length(values.eventType.name) + 13 + length(values.creator) +
		values.details.map(detailsFieldTextLength).reduce((previous, current) => previous + current, 0) +
		//"Zeitplan" + Datum + " Uhr" + (" und dauert " + missionLength) + ("Missionstyp" + missionType) + #reserveParticipatingFieldSize
		8 + 16 + 4 + ifPresentAddLength(values.missionLength, 12) + ifPresentAddLength(values.missionType, 11) + reserveParticipatingFieldSize(values.reserveParticipating);
	if (embedLength > EMBED) {
		const error = `Event-Information dürfen insgesamt nicht ${EMBED} Zeichen überschreiten. Aktuell: ${embedLength}`;
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

function detailsFieldTextLength(field: EventPostDto['details'][number]): number {
	let fieldLength = length(field.title);
	switch (field.text) {
		case "true":
			fieldLength += 2; //"Ja"
			break;
		case "false":
			fieldLength += 4; //"Nein"
			break;
		default:
			fieldLength += length(field.text); //Currently this doesn't respect auto generated links
			break;
	}
	return fieldLength;
}

function reserveParticipatingFieldSize(reserveParticipating: EventPostDto['reserveParticipating']): number {
	if (reserveParticipating === undefined) {
		return 0;
	}
	//"Reserve nimmt teil" + "Ja"/"Nein"
	return 18 + (reserveParticipating ? 2 : 4);
}

export function validateSquadList(values: EventPostDto, errors: FormErrors): void {
	values.squadList.forEach((squad, squadIndex) => {
		errors[`squadList.${squadIndex}.name`] = requiredFieldWithMaxLength(squad.name, TEXT);
		squad.slotList.forEach((slot, slotIndex) => {
			errors[`squadList.${squadIndex}.slotList.${slotIndex}.name`] = requiredFieldWithMaxLength(slot.name, TEXT);
			errors[`squadList.${squadIndex}.slotList.${slotIndex}.number`] = validate(!Number.isSafeInteger(slot.number) || slot.number <= 0, 'No');
		});
		const count = squad.slotList.reduce((result: Record<number, { path: string[], count: number }>, c, i) => ({
			...result,
			[c.number]: {
				path: [...(result[c.number]?.path || []), `squadList.${squadIndex}.slotList.${i}.number`],
				count: (result[c.number]?.count || 0) + 1,
			},
		}), {});
		for (const key in count) {
			const value = count[key];
			if (value.count <= 1) continue;
			value.path.forEach(path => {
				errors[path] = 'Uneindeutig';
			});
		}
	});
}
