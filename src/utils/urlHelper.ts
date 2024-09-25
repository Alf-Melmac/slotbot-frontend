import {useParams} from 'react-router-dom';

export function useGetBackendUrl(): string {
	let hostname = window.location.hostname;
	let params = useParams<{tenant: string}>();
	console.log(window.location);
	console.log(params);
	if (import.meta.env.DEV) {
		hostname = `${hostname}:8090`;
	}
	return `${window.location.protocol}//${hostname}/backend`;
}

export function getBackendUrlOld(): string {
	let hostname = window.location.hostname;
	if (import.meta.env.DEV) {
		hostname = `${hostname}:8090`;
	}
	return `${window.location.protocol}//${hostname}/backend`;
}

export function getBackendUrl(tenant: string | undefined): string {
	let hostname = window.location.hostname;
	if (import.meta.env.DEV) {
		hostname = `${hostname}:8090`;
	}
	const tenantPart = tenant ? `/${tenant}` : '';
	return `${window.location.protocol}//${hostname}/backend${tenantPart}`;
}

