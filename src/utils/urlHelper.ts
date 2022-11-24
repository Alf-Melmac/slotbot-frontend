export function getBackendUrl(): string {
	const hostname = window.location.hostname;
	let url = hostname.startsWith('events.') ? hostname.substring(7) : hostname;
	return `${window.location.protocol}//backend.${url}`;
}
