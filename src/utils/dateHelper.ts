import dayjs, {Dayjs} from 'dayjs';

/**
 * Date template for the ISO-8601 calendar system, such as 2007-12-03.
 */
export const DATE_TEMPLATE = 'YYYY-MM-DD';
/**
 * Time template for the ISO-8601 calendar system, such as 10:15:30.
 */
const TIME_TEMPLATE = 'HH:mm:ss';
/**
 * {@link TIME_TEMPLATE Time template} without seconds
 */
const TIME_TEMPLATE_SHORT = 'HH:mm';
/**
 * Date and time template for the ISO-8601 calendar system, such as 2007-12-03T10:15:30.
 */
const DATE_TIME_TEMPLATE = `${DATE_TEMPLATE}T${TIME_TEMPLATE}`;

/**
 * Creates a {@link DATE_TIME_TEMPLATE} from the given `date` and hours and minutes from the given `time` in format {@link TIME_TEMPLATE_SHORT}.
 * Sets the seconds to 0 and converts the date to UTC.
 */
export function formatLocalDateTimeToUtcDate(date: string, time: string): string {
	const timeDate = dayjs(time, TIME_TEMPLATE_SHORT);
	return dayjs(date)
		.set('hour', timeDate.hour()).set('minute', timeDate.minute()).set('second', 0)
		.utc()
		.format(DATE_TIME_TEMPLATE);
}

/**
 * Converts the given UTC date in the {@link DATE_TIME_TEMPLATE} format to a local date.
 */
export function convertUtcDateTimeToLocal(date: string): string {
	return convertUtcToLocal(date, DATE_TIME_TEMPLATE).format(DATE_TIME_TEMPLATE);
}

/**
 * Parses the given utc date string with the given template into a local date.
 */
export function convertUtcToLocal(date: Parameters<typeof dayjs.utc>[0], format?: Parameters<typeof dayjs.utc>[1]): Dayjs {
	return dayjs.utc(date, format).local();
}

/**
 * Formats the given date in the {@link DATE_TIME_TEMPLATE} format to UTC.
 *
 * @param date in format {@link DATE_TEMPLATE}
 * @param time in format {@link TIME_TEMPLATE_SHORT}
 */
export function formatLocalDateTimeToUtc(date: string, time: string): string {
	return dayjs(`${date}T${expandTimeTemplateShort(time)}`, DATE_TIME_TEMPLATE)
		.utc()
		.format(DATE_TIME_TEMPLATE);
}

/**
 * Builds a {@link TIME_TEMPLATE} from a {@link TIME_TEMPLATE_SHORT}.
 * Sets the seconds to 0.
 */
function expandTimeTemplateShort(date: string): string {
	return `${date}:00`;
}

/**
 * Returns the date part of the given date in the {@link DATE_TEMPLATE} format.
 */
export function getDate(date: Dayjs): string {
	return date.format(DATE_TEMPLATE);
}

/**
 * Returns the time part of the given date in the {@link TIME_TEMPLATE_SHORT} format.
 */
export function getTimeShort(time: Dayjs): string {
	return time.format(TIME_TEMPLATE_SHORT);
}

/**
 * Returns true if the given dates have the same day, month and year.
 */
export function isDateEqual(date1String: string, date2String: string): boolean {
	const date1 = new Date(date1String);
	const date2 = new Date(date2String);
	return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
}

/**
 * @see dayjsRange
 */
export function dateRange(start: Date, end: Date) {
	return dayjsRange(dayjs(start), dayjs(end));
}

/**
 * Builds an array containing every date between and including the two given dates
 *
 * @param start first day of the range
 * @param end last day of the range
 */
export function dayjsRange(start: Dayjs, end: Dayjs) {
	const range = [];
	let current = start;
	while (current.isBefore(end)) {
		range.push(current);
		current = current.add(1, 'day');
	}
	return range;
}
