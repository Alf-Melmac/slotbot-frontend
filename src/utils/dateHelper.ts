import dayjs from 'dayjs';

/**
 * Parses the given date to a date in the ISO-8601 calendar system, such as 2007-12-03.
 */
export function parseToIsoDate(date: Date): string {
	return dayjs(date).format('YYYY-MM-DD');
}

/**
 * Parses the given date to a time in the ISO-8601 calendar system, such as 10:15:30.
 */
export function parseToIsoTime(date: Date): string {
	return dayjs(date).format('HH:mm:ss');
}
