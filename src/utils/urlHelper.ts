export function getBackendUrl(): string {
	return `${window.location.protocol}//${window.location.hostname}:8090`;
}
