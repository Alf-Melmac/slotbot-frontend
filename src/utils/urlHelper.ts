export function getBackendUrl(): string {
	let hostname = globalThis.location.hostname;
	if (import.meta.env.DEV) {
		hostname = `${hostname}:8090`;
	}
	return `${globalThis.location.protocol}//${hostname}/backend`;
}
