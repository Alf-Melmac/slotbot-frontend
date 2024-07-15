import {MaybeFeatureFlag, useGetFeatureFlags} from './useGetFeatureFlags';

/**
 * Returns the enabled value if the feature is enabled, otherwise the notEnabled value. When the feature flags are still loading, undefined is returned.
 * @see useRequireFeatureFlagSave
 */
export function useRequireFeatureFlag<T>(feature: MaybeFeatureFlag, enabled: T, notEnabled: T): T | undefined {
	const featureQuery = useGetFeatureFlags();
	if (featureQuery.isLoading) {
		return undefined;
	}
	if ((featureQuery.isSuccess && !featureQuery.data.includes(feature)) || featureQuery.isError) {
		return notEnabled;
	}

	return enabled;
}

/**
 * Returns the enabled value if the feature is enabled, otherwise the notEnabled value. When the feature flags are still loading, the notEnabled value is returned.
 * @see useRequireFeatureFlag
 */
export function useRequireFeatureFlagSave<T>(feature: MaybeFeatureFlag, enabled: T, notEnabled: T): T {
	const featureQuery = useRequireFeatureFlag(feature, enabled, notEnabled);
	return featureQuery ?? notEnabled;
}
