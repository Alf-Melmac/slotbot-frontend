import {ReactNode} from 'react';
import slotbotServerClient from '../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';

type RequireFeatureFlagProps = {
	/**
	 * Element to render if the feature is enabled
	 */
	children: ReactNode,
	/**
	 * Element to render if the feature is not enabled
	 */
	notEnabled: ReactNode,
	/**
	 * The feature to check for
	 */
	feature: string;
};

export function RequireFeatureFlag(props: Readonly<RequireFeatureFlagProps>): ReactNode {
	const {children, notEnabled, feature} = props;

	const getFeatureFlags = () => slotbotServerClient.get('/feature-flags').then((res) => res.data);
	const featureQuery = useQuery<string[], Error>({
		queryKey: ['feature-flags'],
		queryFn: getFeatureFlags,
		staleTime: 1000 * 60 * 5,
	});
	if (featureQuery.isLoading) {
		return <></>;
	}
	if ((featureQuery.isSuccess && !featureQuery.data.includes(feature)) || featureQuery.isError) {
		return notEnabled;
	}

	return children;
}
