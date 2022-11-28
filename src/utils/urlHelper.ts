export function getBackendUrl(): string {
	let hostname = window.location.hostname;
	if (import.meta.env.DEV) {
		hostname = `${hostname}:8090`;
	}
	return `${window.location.protocol}//${hostname}/backend`;
}
