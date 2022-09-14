import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

const dateTemplate = 'YYYY-MM-DD';
const timeTemplate = 'HH:mm:ss';

/**
 * Formats the given string to a date in the ISO-8601 calendar system, such as 2007-12-03.
 */
export function formatDate(date: Date): string {
	return dayjs(date).format(dateTemplate);
}

/**
 * Formats the given date to a time in the ISO-8601 calendar system, such as 10:15:30.
 */
export function formatTime(date: Date): string {
	return dayjs(date).format(timeTemplate);
}

/**
 * Parses the given date string in the ISO-8601 calendar system, such as 2007-12-03, to a date.
 */
export function parseDate(date: string): Date {
	return parse(date, dateTemplate);
}

/**
 * Parses the given time string in the ISO-8601 calendar system, such as 2007-12-03, to a date.
 */
export function parseTime(date: string): Date {
	return parse(date, timeTemplate);
}

/**
 * Parses the given date string with the given template into a date. Enables the customParseFormat plugin
 */
function parse(date: string, template: string): Date {
	dayjs.extend(customParseFormat);
	return dayjs(date, template).toDate();
}
