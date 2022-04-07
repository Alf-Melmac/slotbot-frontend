import {Box} from '@mantine/core';
import React, {CSSProperties, ReactNode} from 'react';

type SectionProps = {
	children: ReactNode;
	boxRef?: React.MutableRefObject<HTMLDivElement>;
	backgroundImage?: string;
};

export function Section(props: SectionProps): JSX.Element {
	const {children, boxRef, backgroundImage} = props;

	const style: CSSProperties | undefined = backgroundImage ? {
		position: 'relative',
		backgroundImage: `url(${backgroundImage})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundRepeat: "no-repeat",
		backgroundAttachment: "scroll",
	} : undefined;
	return (
		<Box component={'section'} py={180} ref={boxRef} style={style}>
			{children}
		</Box>
	);
}
