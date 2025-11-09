import {randomId} from '@mantine/hooks';
import {
	EventActionFormReturn,
	EventActionFormType,
	EventEditFormType,
} from '../../../../contexts/event/action/EventActionFormContext';
import {EventUpdateDto, SlotDto, SquadDto} from '../../eventTypes';
import {filterFrontendIds} from '../../../../utils/formHelper';

/**
 * Creates a new empty squad with a single slot.
 * @see buildNewSlot
 */
export function buildNewSquad(form: EventActionFormReturn): SquadDto {
	return {
		name: '',
		slotList: [buildNewSlot(form)],
		reservedFor: '',
		requirements: [],
		id: randomId(),
	};
}

/**
 * Duplicates the given squad and all its slots. The new squad will have a new id and slot numbers are adjusted to be unique.
 * @see duplicateSlot
 */
export function duplicateSquad(form: EventActionFormReturn, squad: SquadDto): SquadDto {
	const usedSlotNumbers: number[] = [];
	const slotList = squad.slotList.map(slot => {
		const duplicate = duplicateSlot(form, slot, usedSlotNumbers);
		usedSlotNumbers.push(duplicate.number);
		return duplicate;
	});

	return {
		...squad,
		id: randomId(),
		slotList: slotList,
	};
}

/**
 * Creates a new empty slot
 */
export function buildNewSlot(form: EventActionFormReturn): SlotDto {
	return {
		number: findFirstUnusedSlotNumber(form.values.squadList),
		name: '',
		reservedFor: '',
		requirements: [],
		blocked: false,
		replacementText: 'Gesperrt',
		id: randomId(),
	};
}

/**
 * Finds the first unused slot number in the given squad list
 *
 * @param squadList List of squads to search for used slot numbers
 * @param additionalUsedSlotNumbers Additional slot numbers that should be considered as used
 */
function findFirstUnusedSlotNumber(squadList: EventActionFormType['squadList'], additionalUsedSlotNumbers: number[] = []): number {
	const slotNumbers = new Set(
		squadList.flatMap((squad => squad.slotList.map(slot => slot.number)))
			.concat(additionalUsedSlotNumbers));
	let slotNumber = 1;
	while (slotNumbers.has(slotNumber)) {
		slotNumber++;
	}
	return slotNumber;
}

/**
 * Duplicates the given slot. The new slot will have a new id and a slot number that is unique in the given form.
 */
export function duplicateSlot(form: EventActionFormReturn, slot: SlotDto, additionalUsedSlotNumbers?: number[]): SlotDto {
	return {
		...slot,
		id: randomId(),
		number: findFirstUnusedSlotNumber(form.values.squadList, additionalUsedSlotNumbers),
	};
}

export function prepareForMutation(squadList: EventEditFormType['squadList']): EventUpdateDto['squadList'] {
	const filtered = filterFrontendIds<EventEditFormType['squadList'][number]>(squadList);
	return filtered.map(squad => ({
		...squad,
		requirements: squad.requirements.map(r => Number.parseInt(r)),
		slotList: squad.slotList.map(slot => ({
			...slot,
			requirements: slot.requirements.map(r => Number.parseInt(r)),
		})),
	}));
}
