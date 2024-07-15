import {ReactNode} from 'react';
import {useRequireFeatureFlag} from './useRequireFeatureFlag';
import {MaybeFeatureFlag} from './useGetFeatureFlags';

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
	feature: MaybeFeatureFlag;
};

export function RequireFeatureFlag(props: Readonly<RequireFeatureFlagProps>): ReactNode {
	const {children, notEnabled, feature} = props;

	const featureFlag = useRequireFeatureFlag(feature, children, notEnabled);
	return featureFlag !== undefined ? featureFlag : <></>;
}
