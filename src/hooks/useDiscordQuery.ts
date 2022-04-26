import {useRef, useState} from "react";
import {useShallowEffect} from "@mantine/hooks";

type QueryOptions = {
	params?: Record<string, string>;
	useSuspense?: boolean;
};

export type DiscordQuery<T> = {
	result: T | null;
	error: unknown;
	isLoading: boolean;
};

function buildHorizonApiUrl(endpoint: string): string {
	return `https://discord.com/api/v10${endpoint}`;
}

export function useDiscordQuery<T>(endpoint: string, options?: QueryOptions): DiscordQuery<T> {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<unknown>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const fetcherRef = useRef<Promise<void>>();

	const {params, useSuspense} = {...options};

	if (!endpoint.startsWith('/')) {
		throw new Error('Endpoints must start with a slash (/)');
	}

	const loadData = () => {
		setIsLoading(true);

		const defaultHeaders = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		};
		const headers: Headers = new Headers(defaultHeaders);

		const url = new URL(buildHorizonApiUrl(endpoint));
		url.search = new URLSearchParams(params).toString();

		fetcherRef.current = new Promise<void>((resolve) =>
			fetch(url.toString(), {
				headers,
			})
				.then((res) => {
					if (!res.ok) {
						throw res;
					}
					return res.json();
				})
				.then((result) => {
					setData(result as T);
					resolve();
				})
				.catch((err) => {
					setError(err);
				})
				.finally(() => {
					setIsLoading(false);
				}),
		);
	};
	useShallowEffect(loadData, [endpoint, params]);

	if (isLoading && useSuspense) {
		throw fetcherRef.current;
	}
	return {
		result: data,
		error: error,
		isLoading: isLoading,
	};
}
