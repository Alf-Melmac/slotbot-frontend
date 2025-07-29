import {Box, Breadcrumbs, Group, Text} from '@mantine/core';
import {AnchorLink} from './Text/AnchorLink';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {TextKey} from '../contexts/language/Language';
import {T} from './T';
import {JSX} from 'react';
import classes from './Breadcrumb.module.css';
import utilsClasses from '../utils/styleUtils.module.css';

type BreadcrumbItem = {
	/**
	 * item text
	 */
	title: JSX.Element | TextKey | string;
	/**
	 * Already translated or static `title`
	 * @default false
	 */
	staticTitle?: boolean;
	/**
	 * Creates a link
	 */
	href?: string;
	/**
	 * Truncate text with ellipsis
	 */
	ellipsis?: boolean;
}

type BreadcrumbProps = {
	items: BreadcrumbItem[];
};

export function Breadcrumb(props: Readonly<BreadcrumbProps>): JSX.Element {
	const breadcrumbItems = props.items.map((item, index) => {
		const {title, staticTitle = false, href, ellipsis} = item;
		const text = (staticTitle || typeof title !== 'string') ? title : <T k={title}/>;

		const ellipsisClassName = ellipsis ? utilsClasses.ellipsis : undefined;
		return href ?
			<AnchorLink to={href} className={ellipsisClassName} key={index}>
				{index == 0 ?
					<Group gap={4} wrap={'nowrap'}>
						<FontAwesomeIcon icon={faCircleChevronLeft} className={classes.chevron} widthAuto/>
						<Text className={ellipsisClassName}>{text}</Text>
					</Group>
					:
					<Text className={ellipsisClassName}>{text}</Text>
				}
			</AnchorLink>
			:
			<Box key={index}>{text}</Box>;
	});

	return (
		<Breadcrumbs mb={6}>
			{breadcrumbItems}
		</Breadcrumbs>
	);
}
