import {Affix, Box, Button, Transition} from '@mantine/core';
import {useIntersection, useMergedRef, useScrollIntoView} from '@mantine/hooks';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowDown, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {T} from '../T';
import {JSX} from 'react';

type ScrollAffixProps = {
	/**
	 * Decides if the affix needs to be shown at all, even if the children element is not visible
	 */
	show: boolean;
	children: JSX.Element;
	/**
	 * Function triggered just before the scroll is triggered
	 */
	onScroll?: () => void;
}

/**
 * Affix to scroll to children element is shown if children element is not visible on screen and <code>props.show</code> is true
 */
export function ScrollAffix({children, show, onScroll}: Readonly<ScrollAffixProps>): JSX.Element {
	const {scrollIntoView, targetRef} = useScrollIntoView<HTMLDivElement>();
	const {ref, entry} = useIntersection();
	const mergedRef = useMergedRef(targetRef, ref);

	function onClick() {
		onScroll?.();
		scrollIntoView({alignment: 'center'});
	}

	return <>
		<Box ref={mergedRef}>
			{children}
		</Box>

		<Affix position={{bottom: 20, right: 20}}>
			<Transition transition={(entry?.boundingClientRect.top || 0) > 0 ? 'slide-up' : 'slide-down'}
						mounted={show && !entry?.isIntersecting}>
				{(transitionStyles) => (
					<Button style={transitionStyles}
							leftSection={<FontAwesomeIcon
								icon={(entry?.boundingClientRect.top || 0) > 0 ? faArrowDown : faArrowUp}/>}
							onClick={onClick}><T k={'unsavedChanges'}/></Button>
				)}
			</Transition>
		</Affix>
	</>;
}
