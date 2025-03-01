import slotbotServerClient from '../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';

export function useGetFeatureFlags() {
	const getFeatureFlags = () => slotbotServerClient.get('/feature-flags').then((res) => res.data);
	return useQuery<MaybeFeatureFlag[], Error>({
		queryKey: ['feature-flags'],
		queryFn: getFeatureFlags,
		staleTime: 1000 * 60 * 5,
	});
}

/**
 * Not complete list of available feature flags
 */
export enum FeatureFlag {
	REQUIREMENTS = 'REQUIREMENTS',
}

export type MaybeFeatureFlag = FeatureFlag | string;
