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
 * Date and time template for the ISO-8601 calendar system, such as 2007-12-03T10:15:30.
 */
const DATE_TIME_TEMPLATE = `${DATE_TEMPLATE}T${TIME_TEMPLATE}`;

/**
 * Creates a {@link DATE_TIME_TEMPLATE} from the given `date` and hours and minutes from the given `time`.
 * Sets the seconds to 0 and converts the date to UTC.
 */
export function formatLocalDateTimeToUtcDate(date: Date, time: Date): string {
	return dayjs(date)
		.set('hour', time.getHours()).set('minute', time.getMinutes()).set('second', 0)
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
 */
export function formatLocalDateTimeToUtc(date: string): string {
	return dayjs(date, DATE_TIME_TEMPLATE).utc().format(DATE_TIME_TEMPLATE);
}

/**
 * Returns the date part of the given date in the {@link DATE_TEMPLATE} format.
 */
export function getDate(date: Date): string {
	return dayjs(date).format(DATE_TEMPLATE);
}

/**
 * Returns the time part of the given date in the {@link TIME_TEMPLATE} format.
 * Sets the seconds to 0.
 */
export function getTime(date: Date): string {
	return dayjs(date).set('second', 0).format(TIME_TEMPLATE);
}

/**
 * Returns true if the given dates have the same day, month and year.
 */
export function isDateEqual(date1: Date, date2: Date): boolean {
	return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
}

/**
 * Returns true if the given dates have the same hours and minutes.
 */
export function areHoursAndMinutesEqual(date1: Date, date2: Date): boolean {
	return date1.getHours() === date2.getHours() && date1.getMinutes() === date2.getMinutes();
}
