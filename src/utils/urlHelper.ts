export function getBackendUrl(): string {
	const hostname = window.location.hostname;
	if (import.meta.env.DEV) {
		return `${window.location.protocol}//${hostname}:8090`;
	}
	let url = hostname.startsWith('events.') ? hostname.substring(7) : hostname;
	return `${window.location.protocol}//backend.${url}`;
}
