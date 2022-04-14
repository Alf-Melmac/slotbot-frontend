import React from 'react';
import {Overlay} from '@mantine/core';

type StartPageImagesOverlayProps = {
	opacity?: React.CSSProperties['opacity'];
	startingAlpha?: number;
};

export function StartPageImageOverlay(props: StartPageImagesOverlayProps): JSX.Element {
	const {opacity = 1, startingAlpha = .5} = props;

	return (
		<Overlay
			gradient={`linear-gradient(180deg, rgba(0, 0, 0, ${startingAlpha}) 0%, rgba(0, 0, 0, .65) 40%)`}
			opacity={opacity}
			zIndex={0}
		/>
	);
}
